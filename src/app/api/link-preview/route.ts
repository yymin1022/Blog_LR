import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
        }

        let title = url;
        let description = "";
        let image = "";
        let siteName = "";

        try {
            siteName = new URL(url).hostname;
        } catch (_) {}

        try {
            // Fetch target page html
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                },
                next: { revalidate: 86400 } // Cache results for 24h
            });

            if (response.ok) {
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
        } catch (fetchError) {
            console.warn(`Link preview: Network error fetching metadata for ${url}:`, fetchError);
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
