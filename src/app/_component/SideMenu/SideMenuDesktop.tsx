const SideMenuDesktop = () => {
    return(
        <div className="h-full w-[400px] flex flex-col justify-end bg-primary-blog_blue">
            <SideMenuTitle />
            <SideMenuDivider />
            <SideMenuNav />
        </div>
    );
}

const SideMenuDivider = () => {
    return(
        <div className="h-[1px] bg-primary-blog_white mx-[20px] my-[10px]" />
    );
}

const SideMenuNav = () => {
    return(
        <div>
            Nav
        </div>
    );
}

const SideMenuTitle = () => {
    return(
        <div>
            Title
        </div>
    );
}

export default SideMenuDesktop;