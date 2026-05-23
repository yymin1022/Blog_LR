import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { collection, doc, Firestore, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import fs from "fs";

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

export const getFBPostList = async (postType: string) => {
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
};

export const getFBPostData = async (postType: string, postID: string) => {
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

    try {
        const postDocData = await getDoc(doc(db, postType, postID));
        if (!postDocData.exists()) {
            resultData.RESULT_CODE = 100;
            resultData.RESULT_MSG = "No Such Method!!";
            return resultData;
        }
        resultData.RESULT_DATA.PostDate = postDocData.data().date || "";
        resultData.RESULT_DATA.PostIsPinned = postDocData.data().isPinned || false;
        resultData.RESULT_DATA.PostTag = postDocData.data().tag || [];
        resultData.RESULT_DATA.PostTitle = postDocData.data().title || "";

        const postURL = postDocData.data().url || "";
        resultData.RESULT_DATA.PostURL = postURL;

        const postDataDir = process.env.POST_DATA_DIR || "";
        const postDir = `${postDataDir}/${postType}/${postURL}`;
        resultData.RESULT_DATA.PostContent = fs.readFileSync(`${postDir}/post.md`, "utf8");

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    } catch (error: any) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = error.message || String(error);
    }

    return resultData;
};

export const getFBPostImage = (postType: string, postID: string, srcID: string) => {
    const resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            ImageData: ""
        }
    };

    const postDataDir = process.env.POST_DATA_DIR || "";
    let srcDir = `${postDataDir}/${postType}`;
    if (postType !== "solving") {
        srcDir = srcDir + `/${postID}`;
    }

    try {
        const tempData = fs.readFileSync(`${srcDir}/${srcID}`);
        resultData.RESULT_DATA.ImageData = Buffer.from(tempData).toString("base64");

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    } catch (error: any) {
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = error.message || String(error);
    }

    return resultData;
};
