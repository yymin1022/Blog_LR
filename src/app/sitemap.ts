import type { MetadataRoute } from "next";
import { CDN_BASE_URL, SITE_URL } from "@/utils/PostDataUtil";

export const revalidate = 86400; // 24시간마다 백그라운드 갱신 (ISR)

interface PostIndexItem {
    postID: string;
    postDate?: string;
}

function parsePostDate(dateStr?: string): Date {
    if (!dateStr) return new Date();
    const cleaned = dateStr.replace(/\./g, ",");
    const parsed = new Date(cleaned);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = SITE_URL;

    // 1. 고정 페이지 목록 (Home 및 카테고리 목록 페이지)
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${siteUrl}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/project`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/solving`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // 2. UsefulBlog_Data의 posts.json에서 전체 포스트 목록 가져오기
    let postRoutes: MetadataRoute.Sitemap = [];
    try {
        const response = await fetch(`${CDN_BASE_URL}/posts.json`, {
            next: { revalidate: 86400 },
        });

        if (response.ok) {
            const postsIndex: Record<string, PostIndexItem[]> = await response.json();

            postRoutes = Object.entries(postsIndex).flatMap(([category, posts]) => {
                if (!Array.isArray(posts)) return [];

                return posts
                    .filter((post) => Boolean(post.postID))
                    .map((post) => {
                        const isAbout = category === "about";
                        return {
                            url: `${siteUrl}/${category}/${post.postID}`,
                            lastModified: parsePostDate(post.postDate),
                            changeFrequency: isAbout ? ("monthly" as const) : ("weekly" as const),
                            priority: isAbout ? 0.7 : 0.6,
                        };
                    });
            });
        }
    } catch (error) {
        console.error("Failed to generate dynamic sitemap:", error);
    }

    return [...staticRoutes, ...postRoutes];
}
