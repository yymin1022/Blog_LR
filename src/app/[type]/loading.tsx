import React from "react";
import Skeleton from "@/app/_component/Skeleton/Skeleton";

export default function PostListLoading() {
    return (
        <div className="w-full max-w-[1000px] flex flex-col mx-auto px-[16px] sm:px-[24px] py-[30px] lg:my-[50px] select-none">
            {/* ── Featured Posts Section Skeleton ─────────────── */}
            <div className="w-full mb-[10px]">
                <div className="flex items-center gap-[8px] mb-[6px]">
                    <span className="w-[3px] h-[16px] bg-primary-blog_blue/30 rounded-full animate-pulse" />
                    <span className="text-[12px] font-bold text-primary-blog_blue/40 uppercase tracking-widest font-nanum-b">Featured</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] w-full">
                    <PinnedCardSkeleton />
                    <PinnedCardSkeleton />
                </div>
            </div>

            {/* Divider */}
            <hr className="w-full border-0 bg-gradient-to-r from-transparent via-[#DDDDDD]/50 to-transparent h-[1px] my-[16px]" />

            {/* ── Regular Posts Grid Skeleton ───────────────────── */}
            <div className="w-full">
                <div className="flex items-center gap-[8px] mb-[12px]">
                    <span className="w-[3px] h-[16px] bg-[#DDDDDD]/60 rounded-full animate-pulse" />
                    <span className="text-[12px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest font-nanum-b">Posts</span>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-center min-[1400px]:justify-between">
                    <RegularCardSkeleton />
                    <RegularCardSkeleton />
                    <RegularCardSkeleton />
                    <RegularCardSkeleton />
                </div>
            </div>
        </div>
    );
}

const PinnedCardSkeleton = () => {
    return (
        <div className="w-full h-[150px] flex flex-row shadow-[0_1px_2px_rgba(0,0,0,0.15)] my-[15px] bg-primary-blog_white overflow-hidden">
            {/* Mock Image */}
            <Skeleton className="w-[150px] h-[150px] flex-shrink-0 !rounded-none" />
            {/* Mock Text */}
            <div className="flex-1 h-[150px] flex flex-col justify-center px-[20px] py-[10px] min-w-0">
                <Skeleton className="h-[18px] w-[75%] mb-[12px] rounded" />
                <Skeleton className="h-[14px] w-[40%] mb-[8px] rounded" />
                <Skeleton className="h-[14px] w-[25%] rounded" />
            </div>
        </div>
    );
};

const RegularCardSkeleton = () => {
    return (
        <div className="w-[350px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[450px] flex flex-row min-[1400px]:flex-col shadow-[0_1px_2px_rgba(0,0,0,0.15)] my-[15px] bg-primary-blog_white overflow-hidden">
            {/* Mock Image */}
            <Skeleton className="w-[150px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[300px] flex-shrink-0 !rounded-none" />
            {/* Mock Text */}
            <div className="w-[200px] min-[1400px]:w-[300px] h-[150px] flex flex-col justify-center min-[1400px]:justify-start px-[20px] py-[10px] min-[1400px]:pt-[15px]">
                <Skeleton className="h-[18px] min-[1400px]:h-[22px] w-[80%] mb-[12px] min-[1400px]:mb-[14px] rounded" />
                <Skeleton className="h-[14px] min-[1400px]:h-[15px] w-[45%] mb-[8px] min-[1400px]:mb-[12px] rounded" />
                <Skeleton className="h-[14px] min-[1400px]:h-[15px] w-[30%] rounded" />
            </div>
        </div>
    );
};
