import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/_component/SideMenu/SideMenu";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <SideMenu/>
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}
