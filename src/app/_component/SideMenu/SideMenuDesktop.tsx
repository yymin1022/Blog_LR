import {FaFacebook, FaGithub, FaGooglePlay, FaInstagram, FaLinkedin} from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import {UrlData} from "@/utils/UrlData";

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
            <SideMenuNavButton url={UrlData.facebook}/>
            <SideMenuNavButton url={UrlData.github}/>
            <SideMenuNavButton url={UrlData.googleplay}/>
            <SideMenuNavButton url={UrlData.instagram}/>
            <SideMenuNavButton url={UrlData.linkedin}/>
        </div>
    );
}

const SideMenuNavButton = ({url}: {url: UrlData}) => {
    return(
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-115 active:scale-95 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
            {
                url == UrlData.facebook ?
                    <FaFacebook color="white" size="2em" />
                    : url == UrlData.github ?
                        <FaGithub color="white" size="2em" />
                        : url == UrlData.googleplay ?
                            <FaGooglePlay color="white" size="2em" />
                            : url == UrlData.instagram ?
                                <FaInstagram color="white" size="2em" />
                                : <FaLinkedin color="white" size="2em" />
            }
        </Link>
    );
}

const SideMenuTitle = () => {
    return(
        <Link href={"/"} className="group">
            <div className="flex flex-col mx-[30px] font-nanum-l text-6xl text-primary-blog_white transition-all duration-300 group-hover:translate-x-1">
                LR의<br/>
                <span className="font-nanum-b font-black mt-[10px]">IT블로그</span>
            </div>
        </Link>
    );
}

export default SideMenuDesktop;