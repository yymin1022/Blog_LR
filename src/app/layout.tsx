import type { Metadata } from "next";
import SideMenu from "@/app/_component/SideMenu/SideMenu";
import "./globals.css";

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
        <html lang="en">
            <body>
                <div className="w-full flex flex-col lg:flex-row">
                    <SideMenu/>
                    <div className="w-full lg:pl-[400px]">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
