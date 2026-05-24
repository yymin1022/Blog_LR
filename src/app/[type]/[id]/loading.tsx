import React from "react";
import Skeleton from "@/app/_component/Skeleton/Skeleton";

export default function PostDetailLoading() {
    return (
        <div className="w-full flex flex-col items-center py-[40px] lg:py-[60px] px-[20px] max-w-[860px] mx-auto select-none">
            {/* Header Block Skeleton */}
            <div className="w-full max-w-[720px] text-left">
                {/* Tags row above title */}
                <div className="flex flex-row flex-wrap gap-[6px] mb-[16px]">
                    <Skeleton className="h-[24px] w-[60px] rounded-full" />
                    <Skeleton className="h-[24px] w-[80px] rounded-full" />
                </div>

                {/* Post Title */}
                <Skeleton className="h-[36px] w-[85%] rounded mb-[18px]" />

                {/* Metadata */}
                <div className="flex flex-row items-center gap-[6px]">
                    <Skeleton className="h-[14px] w-[180px] rounded" />
                </div>
            </div>

            {/* Separator line */}
            <hr className="w-full max-w-[720px] border-0 bg-[#EEEEEE] h-[1px] my-[32px]" />

            {/* Content Body Skeleton */}
            <div className="w-full max-w-[720px] flex flex-col gap-[20px]">
                {/* Paragraph 1 */}
                <div className="flex flex-col gap-[10px]">
                    <Skeleton className="h-[16px] w-[95%] rounded" />
                    <Skeleton className="h-[16px] w-[90%] rounded" />
                    <Skeleton className="h-[16px] w-[85%] rounded" />
                </div>

                {/* Paragraph 2 - Subheading & Content */}
                <div className="flex flex-col gap-[12px] mt-[15px]">
                    <Skeleton className="h-[24px] w-[40%] rounded" />
                    <Skeleton className="h-[16px] w-[98%] rounded" />
                    <Skeleton className="h-[16px] w-[93%] rounded" />
                    <Skeleton className="h-[16px] w-[75%] rounded" />
                </div>

                {/* Paragraph 3 - Mock Image / Code Block Placeholder */}
                <Skeleton className="h-[240px] w-full rounded mt-[10px]" />

                {/* Paragraph 4 */}
                <div className="flex flex-col gap-[10px] mt-[10px]">
                    <Skeleton className="h-[16px] w-full rounded" />
                    <Skeleton className="h-[16px] w-[96%] rounded" />
                    <Skeleton className="h-[16px] w-[80%] rounded" />
                </div>
            </div>

            {/* Comments block skeleton */}
            <div className="w-full max-w-[720px] mt-[60px] border-t border-[#EEEEEE] pt-[32px] flex flex-col gap-[10px]">
                <Skeleton className="h-[100px] w-full rounded" />
            </div>

            {/* Footer */}
            <div className="h-[80px] w-full" />
        </div>
    );
}
