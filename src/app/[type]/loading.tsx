import React from "react";
import Skeleton from "@/app/_component/Skeleton/Skeleton";

export default function PostListLoading() {
    return (
        <div className="w-full max-w-[1000px] flex flex-col mx-auto px-[16px] sm:px-[24px] py-[30px] lg:my-[50px] select-none">
            {/* ── Featured Posts Section Skeleton ─────────────── */}
            <div className="w-full mb-[10px]">
                <div className="flex items-center gap-[8px] mb-[6px]">
                    <span className="w-[3px] h-[16px] bg-primary-blog_blue/15 rounded-full animate-pulse" />
                    <span className="text-[12px] font-bold text-primary-blog_blue/20 uppercase tracking-widest font-nanum-b">Featured</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] w-full">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>

            {/* Divider */}
            <hr className="w-full border-0 bg-gradient-to-r from-transparent via-[#DDDDDD]/25 to-transparent h-[1px] my-[16px]" />

            {/* ── Regular Posts Grid Skeleton ───────────────────── */}
            <div className="w-full">
                <div className="flex items-center gap-[8px] mb-[12px]">
                    <span className="w-[3px] h-[16px] bg-[#DDDDDD]/30 rounded-full animate-pulse" />
                    <span className="text-[12px] font-bold text-[#9CA3AF]/35 uppercase tracking-widest font-nanum-b">Posts</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] w-full">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        </div>
    );
}

const CardSkeleton = () => {
    return (
        <div className="w-full h-[155px] flex flex-row border border-[#EEF2F6] rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.01)] my-[10px] bg-primary-blog_white overflow-hidden">
            {/* Mock Image (Polaroid Inset style) */}
            <div className="p-[12px] pr-0 w-[142px] h-[155px] flex-shrink-0">
                <Skeleton className="w-full h-full rounded-[10px]" />
            </div>
            {/* Mock Text */}
            <div className="flex-1 h-[155px] flex flex-col justify-between px-[20px] py-[18px] min-w-0">
                <div className="flex flex-col text-left">
                    <Skeleton className="h-[18px] w-[75%] mb-[12px] rounded" />
                    <Skeleton className="h-[14px] w-[40%] rounded" />
                </div>
                <div className="flex flex-row gap-[6px] mt-auto">
                    <Skeleton className="h-[18px] w-[50px] rounded-full" />
                    <Skeleton className="h-[18px] w-[60px] rounded-full" />
                </div>
            </div>
        </div>
    );
};
