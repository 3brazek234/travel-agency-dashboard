import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { sidebarItems } from "../../constants";
import logOut from "../../assets/icons/logout.svg";
import Logo from "./Logo";
import { logoutUser } from "../../appwrite/auth";
import type { User } from "../..";



function NavItems({ handleClose }: { handleClose?: () => void }) {
  const navigate = useNavigate();
  const logOutFun = () => {
    logoutUser();
    navigate("/");
  };

  const user = useLoaderData() as User;  
  return (
    <section className="nav-items">
      <Logo />
      <div className="container">
        <nav>
          {sidebarItems.map(({ id, label, icon: Icon, href }) => (
            <NavLink to={href} end={href === "/dashboard"} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 !text-white": isActive,
                  })}
                  onClick={handleClose}
                >
                  <img
                    src={Icon}
                    alt={label}
                    className={`group-hover:brightness-0 size-0 group-hover:invert ${
                      isActive ? "brightness-0 invert" : "text-dark-200"
                    }`}
                    
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <img
            src={user?.imgUrl || "/assets/images/david.webp"}
            alt={user?.name}
            referrerPolicy="no-referrer" 
          />
          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>
          <button className="cursor-pointer" onClick={logOutFun}>
            <img src={logOut} alt="logout" className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </section>
  );
}

export default NavItems;
