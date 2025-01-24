import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    // need to go to a page to ask user to sigin or login
    return <div></div>;
  }

  return children;
};

export default ProtectedRoute;
