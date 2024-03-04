import {FaFacebook, FaGithub, FaGooglePlay, FaInstagram, FaLinkedin} from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import {UrlData} from "@/utils/UrlData";

const SideMenuDesktop = () => {
    return(
        <div className="h-screen w-[400px] flex flex-col justify-end bg-primary-blog_blue">
            <SideMenuTitle />
            <SideMenuDivider />
            <SideMenuNav />
        </div>
    );
}

const SideMenuDivider = () => {
    return(
        <div className="h-[1px] bg-primary-blog_white mx-[20px] my-[30px]" />
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
        <Link href={url}>
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
        <Link href={"/"}>
            <div className="flex flex-col mx-[30px] font-nanum-l text-6xl text-primary-blog_white">
                LR의<br/>
                IT블로그
            </div>
        </Link>
    );
}

export default SideMenuDesktop;