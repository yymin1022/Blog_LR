export const CATEGORY_MAP: Record<string, { en: string; ko: string }> = {
    blog: { en: "Blog", ko: "블로그" },
    project: { en: "Project", ko: "프로젝트" },
    solving: { en: "Problem Solving", ko: "Problem Solving" },
    about: { en: "About Me", ko: "소개" },
};

export function getCategoryNameEn(slug: string): string {
    return CATEGORY_MAP[slug]?.en || slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function getCategoryNameKo(slug: string): string {
    return CATEGORY_MAP[slug]?.ko || slug;
}
