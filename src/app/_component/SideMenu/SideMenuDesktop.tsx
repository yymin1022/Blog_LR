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
        <div>
            Divider
        </div>
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