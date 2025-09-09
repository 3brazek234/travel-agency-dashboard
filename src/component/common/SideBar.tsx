import NavItems from "../ui/NavItems"
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
function SideBar() {
  return (
    <aside className="w-full max-w-[270px] hidden lg:block">
      <SidebarComponent>
        <NavItems />
      </SidebarComponent>
    </aside>
  )
}

export default SideBar