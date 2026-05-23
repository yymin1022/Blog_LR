import { NextRequest, NextResponse } from "next/server";
import { getFBPostImage } from "@/utils/FirebaseUtil";

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
