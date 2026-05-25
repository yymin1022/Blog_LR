import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { collection, doc, Firestore, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import path from "path";
import { cache } from "react";

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    appId: process.env.FB_APP_ID
};

let firebaseApp: FirebaseApp;
let firebaseDB: Firestore;

export const initFB = (): Firestore => {
    if (!firebaseApp) {
        firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        firebaseDB = getFirestore(firebaseApp);
    }
    return firebaseDB;
};

export interface PostData {
    postDate: string;
    postID: string;
    postIsPinned: boolean;
    postTag: string[];
    postTitle: string;
    postURL: string;
}

function isSafeInput(input: string | null): boolean {
    if (!input) return false;
    if (input.includes("/") || input.includes("\\") || input.includes("..")) {
        return false;
    }
    return true;
}

export const getFBPostList = cache(async (postType: string) => {
    const db = initFB();
    const postList: PostData[] = [];
    const resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            PostCount: 0,
            PostList: postList
        }
    };

    if (!isSafeInput(postType)) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = "Invalid post type";
        return resultData;
    }

    try {
        const postCollectionList = await getDocs(
            query(collection(db, postType), orderBy("isPinned", "desc"))
        );
        postCollectionList.forEach((curData) => {
            resultData.RESULT_DATA.PostCount++;
            const postData: PostData = {
                postDate: curData.get("date") || "",
                postID: curData.id,
                postIsPinned: curData.get("isPinned") || false,
                postTag: curData.get("tag") || [],
                postTitle: curData.get("title") || "",
                postURL: curData.get("url") || "",
            };
            resultData.RESULT_DATA.PostList.push(postData);
        });

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    } catch (error: any) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = error.message || String(error);
    }

    return resultData;
});

export const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/yymin1022/Blog_LR_Data@master";

export async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number } = {}) {
    const { timeout = 8000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

export const getFBPostData = cache(async (postType: string, postID: string) => {
    const db = initFB();
    const resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            PostContent: "",
            PostDate: "",
            PostIsPinned: false,
            PostTag: [] as string[],
            PostTitle: "",
            PostURL: ""
        }
    };

    if (!isSafeInput(postType) || !isSafeInput(postID)) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = "Invalid parameters";
        return resultData;
    }

    try {
        const postDocData = await getDoc(doc(db, postType, postID));
        if (!postDocData.exists()) {
            resultData.RESULT_CODE = 100;
            resultData.RESULT_MSG = "Post not found";
            return resultData;
        }
        resultData.RESULT_DATA.PostDate = postDocData.data().date || "";
        resultData.RESULT_DATA.PostIsPinned = postDocData.data().isPinned || false;
        resultData.RESULT_DATA.PostTag = postDocData.data().tag || [];
        resultData.RESULT_DATA.PostTitle = postDocData.data().title || "";

        const postURL = postDocData.data().url || "";
        resultData.RESULT_DATA.PostURL = postURL;

        if (!isSafeInput(postURL)) {
            resultData.RESULT_CODE = 100;
            resultData.RESULT_MSG = "Invalid post URL";
            return resultData;
        }

        const url = `${CDN_BASE_URL}/${postType}/${postURL}/post.md`;
        const response = await fetchWithTimeout(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch post content (HTTP ${response.status})`);
        }

        resultData.RESULT_DATA.PostContent = await response.text();

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    } catch (error: any) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = error.message || String(error);
    }

    return resultData;
});

export const getFBPostImage = async (postType: string, postID: string, srcID: string) => {
    const resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            ImageData: ""
        }
    };

    if (!isSafeInput(postType) || !isSafeInput(postID) || !isSafeInput(srcID)) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = "Invalid parameters";
        return resultData;
    }

    const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
    const ext = path.extname(srcID).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = "Invalid file extension";
        return resultData;
    }

    try {
        const baseUrl = CDN_BASE_URL;
        const url = postType === "solving"
            ? `${baseUrl}/${postType}/${srcID}`
            : `${baseUrl}/${postType}/${postID}/${srcID}`;

        const response = await fetchWithTimeout(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image (HTTP ${response.status})`);
        }

        const arrayBuffer = await response.arrayBuffer();
        resultData.RESULT_DATA.ImageData = Buffer.from(arrayBuffer).toString("base64");

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    } catch (error: any) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = error.message || String(error);
    }

    return resultData;
};
