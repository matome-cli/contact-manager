import { Link } from "react-router-dom";
import AppHeader from "./app/AppHeader";

const PageNotFound: React.FC = () => {
  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center gap-9 bg-gradient-to-t from-orange-600 to-white relative">
      {/* out of normal flow */}
      <AppHeader fullWidth={true} />

      <h1 className="text-6xl">Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      {/* this should not take user back to login but the actual app */}

      <div className="space-x-8">
        <Link className="text-orange-700 ml-2 lg:hover:underline decoration-wavy " to="/">
          Login
        </Link>
        <Link
          className="text-orange-700 ml-2 lg:hover:underline decoration-wavy "
          to="/create-account"
        >
          Signup
        </Link>
        <Link
          className="text-orange-700 ml-2 lg:hover:underline decoration-wavy "
          to="/manager"
        >
          Contacts
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
