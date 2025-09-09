import { Link } from "react-router-dom"
import homeSvg from "../../../public/icons/logo.svg";
function Logo() {
  return (
   <Link to="/" className="link-logo">
        <img src={homeSvg} alt="home" className="size-[30px]" />
        <h1>Tourvisto</h1>
      </Link>
  )
}

export default Logo