import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MDRenderer from "@/utils/MDRender";
import Utterances from "../_component/Utterances/Utterances";
import { getFBPostData } from "@/utils/FirebaseUtil";
import { notFound } from "next/navigation";

export default async function PostViewPage({
    params,
}: {
    params: Promise<{ type: string; id: string }>;
}) {
    const { type, id } = await params;
    const result = await getFBPostData(type, id);

    if (result.RESULT_CODE !== 200) {
        notFound();
    }

    const { PostContent, PostDate, PostTag, PostTitle, PostURL } = result.RESULT_DATA;

    return (
        <div className="w-full flex flex-col items-center justify-center py-[50px] px-[20px] max-w-[900px] mx-auto">
            {/* Header Block */}
            <div className="w-full text-center">
                <h1 className="text-[28px] min-[1400px]:text-[36px] font-black text-primary-blog_blue leading-tight mb-[15px]">
                    {PostTitle}
                </h1>
                <div className="flex flex-row items-center justify-center text-[15px] text-[#606060] font-nanum-r space-x-[8px]">
                    <span>written by LR</span>
                    <span>|</span>
                    <span>{PostDate}</span>
                </div>
            </div>

            {/* Separator line */}
            <hr className="w-full max-w-[800px] border-0 bg-primary-blog_lightgray_3 h-[1px] my-[30px]" />

            {/* Markdown Content */}
            <div className="w-full max-w-[800px]">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={MDRenderer(PostURL, type)}
                >
                    {PostContent}
                </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="flex flex-row flex-wrap justify-center mt-[50px] gap-x-[15px] gap-y-[10px]">
                {PostTag.map((tag: string) => (
                    <span key={tag} className="text-[#777777] text-[15px] font-nanum-r">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Comments block */}
            <div className="w-full max-w-[800px] mt-[50px] border-t border-[#EEEEEE] pt-[30px]">
                <Utterances />
            </div>

            {/* Footer */}
            <div className="h-[150px] w-full" />
        </div>
    );
}
