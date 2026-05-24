"use client";

import React, { useState, useEffect } from "react";

interface LinkCardProps {
    href: string;
    children: React.ReactNode;
}

interface LinkMetadata {
    title: string;
    description: string;
    image: string;
    siteName: string;
    url: string;
}

// In-memory cache to avoid duplicate fetches for the same URL in a single session
const metadataCache = new Map<string, LinkMetadata | null>();

export const LinkCard: React.FC<LinkCardProps> = ({ href, children }) => {
    const [metadata, setMetadata] = useState<LinkMetadata | null>(() => metadataCache.get(href) || null);
    const [loading, setLoading] = useState(() => {
        const isAbsolute = /^https?:\/\//i.test(href);
        return isAbsolute && !metadataCache.has(href);
    });
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const isAbsolute = /^https?:\/\//i.test(href);
        if (!isAbsolute) {
            setLoading(false);
            return;
        }

        if (metadataCache.has(href)) {
            setMetadata(metadataCache.get(href) || null);
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);

        const fetchMetadata = async () => {
            try {
                const response = await fetch(`/api/link-preview?url=${encodeURIComponent(href)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch link metadata");
                }
                const data = await response.json();
                if (isMounted) {
                    const metaData: LinkMetadata = {
                        title: data.title || "",
                        description: data.description || "",
                        image: data.image || "",
                        siteName: data.siteName || "",
                        url: data.url || href,
                    };
                    metadataCache.set(href, metaData);
                    setMetadata(metaData);
                }
            } catch (err) {
                console.error("Link preview error:", err);
                if (isMounted) {
                    metadataCache.set(href, null);
                    setMetadata(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchMetadata();

        return () => {
            isMounted = false;
        };
    }, [href]);

    // Extract domain for display
    let hostname = "";
    try {
        hostname = new URL(href).hostname;
    } catch (_) {
        hostname = href;
    }

    // Loading/Skeleton State
    if (loading) {
        return (
            <span className="block my-[15px] w-full max-w-[550px] mx-auto select-none">
                <span className="h-[110px] w-full flex flex-row items-stretch border border-[#EEEEEE] bg-white rounded-[15px] overflow-hidden animate-pulse">
                    <span className="flex-1 flex flex-col justify-between p-[14px] min-w-0">
                        <span>
                            <span className="block h-[15px] bg-[#F3F4F6] rounded-[4px] w-[75%] mb-[8px]" />
                            <span className="block h-[11px] bg-[#F3F4F6] rounded-[4px] w-[90%] mb-[5px]" />
                            <span className="block h-[11px] bg-[#F3F4F6] rounded-[4px] w-[60%]" />
                        </span>
                        <span className="block h-[10px] bg-[#F3F4F6] rounded-[4px] w-[35%]" />
                    </span>
                    <span className="w-[120px] h-full bg-[#F3F4F6] border-l border-[#EEEEEE] flex-shrink-0" />
                </span>
            </span>
        );
    }

    // Fallback if metadata fetch fails, has no valid content, or is not an absolute HTTP URL
    const hasMetadata = metadata && (metadata.title || metadata.description);
    if (!hasMetadata) {
        return (
            <a
                target="_blank"
                href={href}
                rel="noopener noreferrer"
                className="block my-[15px] w-full max-w-[550px] mx-auto group no-underline"
            >
                <span className="min-h-[90px] w-full flex flex-col items-start justify-center border border-[#EEEEEE] bg-white rounded-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(22,78,171,0.08)] hover:border-[#164EAB]/20 p-[15px] block text-left">
                    <span className="text-primary-blog_blue text-[15px] font-bold line-clamp-1 group-hover:underline block font-nanum-b leading-tight">
                        {children || href}
                    </span>
                    <span className="text-[#888888] text-[13px] font-medium mt-[6px] line-clamp-1 block font-nanum-r break-all">
                        {href}
                    </span>
                </span>
            </a>
        );
    }

    const showImage = metadata.image && !imageError;

    return (
        <a
            target="_blank"
            href={href}
            rel="noopener noreferrer"
            className="block my-[15px] w-full max-w-[550px] mx-auto group no-underline"
        >
            <span className="h-[110px] w-full flex flex-row items-stretch border border-[#EEEEEE] bg-white rounded-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(22,78,171,0.08)] hover:border-[#164EAB]/30 overflow-hidden block">
                <span className="flex-1 flex flex-col justify-between p-[14px] min-w-0 text-left block">
                    <span className="block">
                        <span className="text-primary-blog_blue text-[15px] font-bold line-clamp-1 group-hover:underline block font-nanum-b leading-tight mb-[4px]">
                            {metadata.title || children}
                        </span>
                        {metadata.description && (
                            <span className="text-[#606060] text-[12.5px] font-medium line-clamp-2 leading-snug block font-nanum-r">
                                {metadata.description}
                            </span>
                        )}
                    </span>
                    <span className="flex items-center gap-[6px] text-[#9CA3AF] text-[11px] font-medium font-nanum-r mt-[4px] block overflow-hidden whitespace-nowrap text-ellipsis">
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
                            alt=""
                            className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                        <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
                            {metadata.siteName || hostname}
                        </span>
                    </span>
                </span>
                {showImage && (
                    <span className="w-[120px] md:w-[140px] h-full flex-shrink-0 bg-[#F9FAFB] border-l border-[#EEEEEE] overflow-hidden relative block">
                        <img
                            src={metadata.image}
                            alt=""
                            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            onError={() => setImageError(true)}
                        />
                    </span>
                )}
            </span>
        </a>
    );
};

export default LinkCard;
