import { useAuth } from "../hooks/useAuth";
import NotAuth from "./NotAuth";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    // need to go to a page to ask user to sigin or login
    return <NotAuth />;
  }

  return children;
};

export default ProtectedRoute;
