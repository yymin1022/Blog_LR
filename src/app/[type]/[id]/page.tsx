import React from "react";
import MDRender from "../_component/MDRender/MDRender";
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
                <h1 className="text-[28px] min-[1400px]:text-[36px] font-black text-primary-blog_blue leading-tight mb-[16px] tracking-tight font-nanum-b">
                    {PostTitle}
                </h1>
                <div className="flex flex-row items-center justify-center text-[14px] text-[#888888] font-nanum-r gap-[8px] select-none">
                    <span>written by <strong className="text-primary-blog_blue font-bold font-nanum-b">LR</strong></span>
                    <span className="text-[#DDDDDD]">•</span>
                    <span>{PostDate}</span>
                </div>
            </div>

            {/* Separator line */}
            <hr className="w-full max-w-[800px] border-0 bg-gradient-to-r from-transparent via-[#DDDDDD] to-transparent h-[1px] my-[30px]" />

            {/* Markdown Content */}
            <div className="w-full max-w-[800px]">
                <MDRender content={PostContent} postURL={PostURL} postType={type} />
            </div>

            {/* Tags */}
            <div className="flex flex-row flex-wrap justify-center mt-[50px] gap-[8px]">
                {PostTag.map((tag: string) => (
                    <span 
                        key={tag} 
                        className="inline-block px-[12px] py-[5px] bg-[#F3F4F6] text-[#4B5563] text-[13px] font-medium rounded-full font-nanum-r cursor-pointer hover:bg-[#E5E7EB] hover:text-primary-blog_blue transition-all duration-200"
                    >
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
