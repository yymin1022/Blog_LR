import { NextRequest, NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

const lookupAsync = promisify(dns.lookup);

function isPrivateIp(ip: string): boolean {
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("127.")) return true;
    if (ip.startsWith("10.")) return true;
    if (ip.startsWith("192.168.")) return true;
    if (ip.startsWith("169.254.")) return true;
    if (ip.startsWith("172.")) {
        const parts = ip.split(".");
        if (parts.length >= 2) {
            const second = parseInt(parts[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
    }
    if (ip.toLowerCase().startsWith("fc00:") || ip.toLowerCase().startsWith("fd00:") || ip.toLowerCase().startsWith("fe80:")) return true;
    return false;
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (_) {
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
        }

        const hostname = parsedUrl.hostname.toLowerCase();
        
        // Basic hostname block
        if (hostname === "localhost" || hostname === "loopback" || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
            return NextResponse.json({ error: "Access Denied" }, { status: 403 });
        }

        // DNS resolution check to prevent loopback/internal requests (DNS Rebinding/SSRF)
        try {
            const { address } = await lookupAsync(hostname);
            if (isPrivateIp(address)) {
                return NextResponse.json({ error: "Access Denied" }, { status: 403 });
            }
        } catch (dnsError) {
            console.warn(`DNS lookup failed for hostname ${hostname}:`, dnsError);
            return NextResponse.json({ error: "Unable to resolve hostname" }, { status: 400 });
        }

        let title = url;
        let description = "";
        let image = "";
        let siteName = "";

        try {
            siteName = parsedUrl.hostname;
        } catch (_) {}

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            // Fetch target page html
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                },
                next: { revalidate: 86400 }, // Cache results for 24h
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                // Content type check
                const contentType = response.headers.get("content-type") || "";
                if (!contentType.includes("text/html")) {
                    return NextResponse.json({
                        title,
                        description: "Preview not available for this file type.",
                        image,
                        siteName,
                        url
                    });
                }

                // Content length check (max 512KB)
                const contentLength = response.headers.get("content-length");
                if (contentLength && parseInt(contentLength, 10) > 524288) {
                    return NextResponse.json({
                        title,
                        description: "Page content too large for preview.",
                        image,
                        siteName,
                        url
                    });
                }

                const html = await response.text();

                // Extract metadata using regex
                const getMeta = (regex: RegExp): string => {
                    const match = regex.exec(html);
                    return match ? match[1].trim() : "";
                };

                title = getMeta(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
                        getMeta(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i) ||
                        getMeta(/<title>([^<]+)<\/title>/i) ||
                        title;

                description = getMeta(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
                              getMeta(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i) ||
                              getMeta(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                              getMeta(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
                              "";

                image = getMeta(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                        getMeta(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
                        "";

                siteName = getMeta(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i) ||
                           getMeta(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:site_name["']/i) ||
                           siteName;
            } else {
                console.warn(`Link preview: Failed to fetch metadata for ${url}. Response status: ${response.status}`);
            }
        } catch (fetchError: any) {
            if (fetchError.name === "AbortError") {
                console.warn(`Link preview: Fetch timeout for ${url}`);
            } else {
                console.warn(`Link preview: Network error fetching metadata for ${url}:`, fetchError);
            }
        }

        return NextResponse.json({
            title,
            description,
            image,
            siteName,
            url
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
    }
}
