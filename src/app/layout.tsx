import type { Metadata } from "next";
import SideMenu from "@/app/_component/SideMenu/SideMenu";
import "./globals.css";

export const metadata: Metadata = {
    title: "Dev. LR Blog",
    description: "1인개발자 LR의 IT블로그",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SideMenu/>
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}
