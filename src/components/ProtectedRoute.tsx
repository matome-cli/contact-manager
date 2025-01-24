import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  child: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ child }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    // need to go to a page to ask user to sigin or login
    return <div></div>;
  }

  return child;
};

export default ProtectedRoute;
