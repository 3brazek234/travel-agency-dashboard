import { cn } from "../../lib/utils"
import { useLocation } from "react-router-dom";

function Header({title, description}: {title: string, description: string}) {
   const pathName = useLocation().pathname;
   console.log(pathName);
  return (
 
 <header className="header">
  <article>
    <h1 className={cn("text-dark-100", pathName === "/dashboard" ? "text-2xl md:text-3xl font-bold" : "text-xl md:text-2xl font-semibold")}>{title}</h1>
    <p className={cn("text-gray-100 font-normal", pathName === "/dashboard" ? "text-base md:text-lg" : "text-sm md:text-lg font-normal")}>{description}</p>
  </article>
</header>
  )
}

export default Header