const HomePageDesktop = () => {
    return(
        <div className="flex flex-col mt-[200px] mx-[100px]">
            <HomePageDesktopTitle isBlue={false} text={"안녕하세요"} />
            <HomePageDesktopTitle isBlue={true} text={"대학생 1인개발자"} />
            <HomePageDesktopTitle isBlue={false} text={"LR입니다."} />
        </div>
    );
}

const HomePageDesktopTitle = ({isBlue, text}: {isBlue: boolean, text: string}) => {
    const TITLE_STYLE_BLACK = "my-[5px] font-nanum-r text-7xl text-primary-blog_black";
    const TITLE_STYLE_BLUE = "my-[5px] font-nanum-b text-7xl text-primary-blog_blue";
    return(
        <span className={isBlue ? TITLE_STYLE_BLUE : TITLE_STYLE_BLACK}>{text}</span>
    )
}


export default HomePageDesktop;