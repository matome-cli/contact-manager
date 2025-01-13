import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <main className="w-full h-dvh bg-gradient-to-t from-orange-600 to-white relative">
      <header className="w-full absolute top-0 left-0 pl-4 pt-4 font-semibold font-serif text-2xl">
        Contact manager
      </header>

      <h1 className="text-4xl">Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      {/* this should not take user back to login but the actual app */}

      <div>
        <Link to="/">Login</Link>
        <Link to="/create-account">Signup</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
    </main>
  );
};

export default PageNotFound;
