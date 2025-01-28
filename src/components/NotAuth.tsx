import { Link } from "react-router-dom";

const NotAuth: React.FC = () => {
  return (
    <main className="w-full h-dvh bg-gradient-to-t from-orange-600 to-white flex justify-center items-center">
      <h1 className="text-6xl">Not Authenticated</h1>
      <p>Login or create an account to use App</p>

      <div className="w-36 flex justify-center gap-4">
        <Link className="text-orange-700 ml-2 lg:hover:underline decoration-wavy " to="/">
          Login
        </Link>
        <Link
          className="text-orange-700 ml-2 lg:hover:underline decoration-wavy "
          to="/create-account"
        >
          Signup
        </Link>
      </div>
    </main>
  );
};

export default NotAuth;
