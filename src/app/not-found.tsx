import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
    return (
        <div className="w-full pl-0 min-[1400px]:pl-[100px] flex flex-col justify-center py-[180px] px-[20px] select-none animate-fade-in-up">
            {/* Title Block */}
            <div className="m-[10px]">
                <p className="text-[36px] min-[1400px]:text-[64px] m-0 text-primary-blog_blue font-black inline-block mr-[15px] font-nanum-b tracking-tight">
                    앗!
                </p>
                <p className="text-[36px] min-[1400px]:text-[64px] m-0 text-primary-blog_black inline-block font-nanum-r tracking-tight">
                    잘못된 접근입니다.
                </p>
            </div>

            {/* Subtext */}
            <div className="mx-[10px] my-[5px]">
                <p className="text-[#888888] text-[16px] min-[1400px]:text-[18px] font-nanum-r">
                    요청하신 페이지가 사라졌거나 잘못된 경로입니다.
                </p>
            </div>

            {/* Navigation Block */}
            <div className="m-[10px] mt-[40px] min-[1400px]:mt-[60px]">
                <Link href="/" className="group inline-flex items-center gap-[10px] px-[20px] py-[10px] border border-[#E5E7EB] hover:border-primary-blog_blue/30 rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(22,78,171,0.06)] bg-white transition-all duration-300">
                    <FaArrowLeft className="text-[#888888] group-hover:text-primary-blog_blue group-hover:-translate-x-1 transition-all duration-300" size="1.1em" />
                    <span className="text-primary-blog_black text-[15px] min-[1400px]:text-[16px] font-bold group-hover:text-primary-blog_blue transition-colors font-nanum-b">
                        블로그 홈으로 돌아가기
                    </span>
                </Link>
            </div>
        </div>
    );
}
