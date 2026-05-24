import type { Metadata } from "next";
import localFont from "next/font/local";
import SideMenu from "@/app/_component/SideMenu/SideMenu";
import "./globals.css";

const nanumSquareL = localFont({
    src: "../fonts/NanumSquareL.otf",
    variable: "--font-nanum-l-next",
});
const nanumSquareR = localFont({
    src: "../fonts/NanumSquareR.otf",
    variable: "--font-nanum-r-next",
});
const nanumSquareB = localFont({
    src: "../fonts/NanumSquareB.otf",
    variable: "--font-nanum-b-next",
});

const pretendardL = localFont({
    src: "../fonts/PretendardL.otf",
    variable: "--font-pretendard-l-next",
});
const pretendardR = localFont({
    src: "../fonts/PretendardR.otf",
    variable: "--font-pretendard-r-next",
});
const pretendardB = localFont({
    src: "../fonts/PretendardB.otf",
    variable: "--font-pretendard-b-next",
});

export const metadata: Metadata = {
    title: "Useful Blog",
    description: "1인개발자 Useful의 IT블로그",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html 
            lang="ko"
            className={`${nanumSquareL.variable} ${nanumSquareR.variable} ${nanumSquareB.variable} ${pretendardL.variable} ${pretendardR.variable} ${pretendardB.variable}`}
        >
            <body>
                <div className="w-full flex flex-col lg:flex-row">
                    <SideMenu/>
                    <div className="w-full pt-[65px] lg:pt-0 lg:pl-[400px]">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
