// &ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import Logo from "../ui/Logo";
import toggle from "../../assets/icons/menu.svg";
import NavItems from "../ui/NavItems";
function MobileSideBar() {
  let sidebar: SidebarComponent;
  const toggleSidebar = () => {
    sidebar.toggle();
  }
  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Logo />
        <button onClick={toggleSidebar}>
          <img src={toggle} alt="menu" className="w-7 h-7" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(sidebarInstance: SidebarComponent | null) => {
          if (sidebarInstance) {
            sidebar = sidebarInstance;
          }
        }}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        type="Over"
      >
        <NavItems handleClose={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
}

export default MobileSideBar;
