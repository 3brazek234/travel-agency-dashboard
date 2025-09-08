import SideBar from "../component/common/SideBar"
import { Outlet } from "react-router-dom"
function AdminLayout() {
  return (
    <div className="admin-layout">
        <SideBar />
        <aside className="children">
          <Outlet />
        </aside>
    </div>
  )
}

export default AdminLayout