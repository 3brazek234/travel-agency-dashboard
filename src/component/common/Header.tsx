import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";
interface HeaderProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}
import iconPlus from '../../assets/icons/plus.svg'
function Header({ title, description, ctaText, ctaUrl }: HeaderProps) {
  const pathName = useLocation().pathname;
  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            pathName === "/dashboard"
              ? "text-2xl md:text-3xl font-bold"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            pathName === "/dashboard"
              ? "text-base md:text-lg"
              : "text-sm md:text-lg font-normal"
          )}
        >
          {description}
        </p>
      </article>
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <ButtonComponent
            type="button"
            className=" !bg-primary-100 !h-11 !px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-none w-full md:w-[240px]"
          >
            <img src={iconPlus} alt="Plus" className="w-5 h-5"/>
              <span className="text-white">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header> 
  );
}

export default Header;
