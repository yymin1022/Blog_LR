import { NextRequest, NextResponse } from "next/server";
import { getFBPostImage } from "@/utils/FirebaseUtil";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { postID, postType, srcID } = body;

        if (!postID || !postType || !srcID) {
            return NextResponse.json({
                RESULT_CODE: 100,
                RESULT_MSG: "Missing parameters"
            });
        }

        const result = getFBPostImage(postType, postID, srcID);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({
            RESULT_CODE: 100,
            RESULT_MSG: error.message || String(error)
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postID = searchParams.get("postID");
        const postType = searchParams.get("postType");
        const srcID = searchParams.get("srcID");

        if (!postID || !postType || !srcID) {
            return new Response("Missing parameters", { status: 400 });
        }

        const postDataDir = process.env.POST_DATA_DIR || "";
        let srcDir = `${postDataDir}/${postType}`;
        if (postType !== "solving") {
            srcDir = srcDir + `/${postID}`;
        }

        const filePath = path.join(srcDir, srcID);
        if (!fs.existsSync(filePath)) {
            return new Response("Image not found", { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);
        const ext = path.extname(srcID).toLowerCase();
        let contentType = "image/png";
        if (ext === ".jpg" || ext === ".jpeg") {
            contentType = "image/jpeg";
        } else if (ext === ".gif") {
            contentType = "image/gif";
        } else if (ext === ".svg") {
            contentType = "image/svg+xml";
        }

        return new Response(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable"
            }
        });
    } catch (error: any) {
        return new Response(error.message || "Internal server error", { status: 500 });
    }
}
