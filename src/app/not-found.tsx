import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full pl-0 min-[1400px]:pl-[100px] flex flex-col justify-center py-[150px] px-[20px]">
            {/* Title Block */}
            <div className="m-[10px]">
                <p className="text-[30px] min-[1400px]:text-[60px] m-0 text-primary-blog_blue font-bold inline-block mr-[15px]">
                    앗!
                </p>
                <p className="text-[30px] min-[1400px]:text-[60px] m-0 text-primary-blog_black inline-block">
                    잘못된 접근입니다.
                </p>
            </div>

            {/* Navigation Block */}
            <div className="m-[10px] min-[1400px]:my-[60px] min-[1400px]:mx-[10px]">
                <Link href="/">
                    <span className="text-primary-blog_black text-[20px] font-bold hover:text-primary-blog_blue transition-colors duration-300">
                        블로그 홈으로 돌아가기
                    </span>
                </Link>
            </div>
        </div>
    );
}
