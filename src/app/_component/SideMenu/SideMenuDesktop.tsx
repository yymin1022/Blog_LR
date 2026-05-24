import {FaFacebook, FaGithub, FaGooglePlay, FaInstagram, FaLinkedin} from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import {UrlData} from "@/utils/UrlData";

import { IconType } from "react-icons";

const SOCIAL_LINKS = [
    { url: UrlData.facebook, Icon: FaFacebook, label: "Facebook" },
    { url: UrlData.github, Icon: FaGithub, label: "GitHub" },
    { url: UrlData.googleplay, Icon: FaGooglePlay, label: "Google Play" },
    { url: UrlData.instagram, Icon: FaInstagram, label: "Instagram" },
    { url: UrlData.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
];

const SideMenuDesktop = () => {
    return(
        <div className="fixed left-0 top-0 h-screen w-[400px] flex flex-col justify-end bg-gradient-to-br from-[#1E5FC1] to-[#103D88] shadow-[4px_0_20px_rgba(0,0,0,0.08)]">
            <SideMenuTitle />
            <SideMenuDivider />
            <SideMenuNav />
        </div>
    );
}

const SideMenuDivider = () => {
    return(
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-[20px] my-[30px]" />
    );
}

const SideMenuNav = () => {
    return(
        <div className="flex flex-row justify-evenly mb-[50px]">
            {SOCIAL_LINKS.map(({ url, Icon, label }) => (
                <SideMenuNavButton key={url} url={url} Icon={Icon} label={label} />
            ))}
        </div>
    );
}

const SideMenuNavButton = ({ url, Icon, label }: { url: string; Icon: IconType; label: string }) => {
    return(
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label}
            className="hover:scale-115 active:scale-95 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
            <Icon color="white" size="2em" />
        </Link>
    );
}

const SideMenuTitle = () => {
    return(
        <Link href={"/"} className="group">
            <div className="flex flex-col mx-[30px] font-nanum-l text-5xl text-primary-blog_white transition-all duration-300 group-hover:translate-x-1">
                Useful한<br/>
                <span className="font-nanum-b font-black mt-[10px] text-5xl">IT블로그</span>
            </div>
        </Link>
    );
}

export default SideMenuDesktop;