import SideMenuDesktop from "@/app/_component/SideMenu/SideMenuDesktop";
import SideMenuMobile from "@/app/_component/SideMenu/SideMenuMobile";

const SideMenu = () => {
    return (
        <>
            <div className="hidden lg:block">
                <SideMenuDesktop />
            </div>
            <div className="block lg:hidden">
                <SideMenuMobile />
            </div>
        </>
    );
};

export default SideMenu;