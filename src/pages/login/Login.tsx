import { Link } from "react-router-dom";
import Logo from "../../component/ui/Logo";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import google from "../../assets/icons/google.svg";
import { loginWithGoogle } from "../../appwrite/auth";

function Login() {
  const handleSignIn = async () => {
   loginWithGoogle()
  };
  return (  
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-light-200 to-light-400">
      <section className="glassmorphism w-full h-full flex justify-center items-center px-4 md:px-6">
        <div className="flex flex-col bg-white border border-light-100 shadow-2xl md:max-w-[510px] rounded-[24px] py-10 px-8 w-full max-w-md md:w-4/5 transition-all duration-300">
          <header className="flex items-center gap-2 justify-center mb-6">
            <Link to="/">
              <Logo />
            </Link>
          </header>
          <article className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-100 text-center mb-2 tracking-tight">
              Start Your Travel Journey
            </h2>
            <p className="text-center text-base md:text-lg text-gray-100 leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>
          <ButtonComponent
            type="button"
            onClick={handleSignIn}
            iconCss="e-search-icon"
            className="!bg-primary-100 !px-4 !rounded-lg !flex !items-center !justify-center !gap-2 !shadow-lg !w-full !h-12 hover:!bg-primary-500 transition-colors duration-200 group"
          >
            <img
              src={google}
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
              alt="google"
            />
            <span className="font-semibold text-white">
              Sign in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
}

export default Login;
