import ReusableForm from "./ReusableForm";
import { type Text, Field } from "../../lib/types/types";
import AppHeader from "../app/AppHeader";

const Login: React.FC = () => {
  const text: Text = {
    header: "Sign in",
    button: "SIGNIN",
    link: "REGISTER",
    linkTo: "/create-account",
    paragraph: "New to contact manager?",
  };

  const fields: Field[] = [
    { label: "Email", inputType: "email", name: "email" },
    { label: "Password", inputType: "password", name: "password" },
  ];

  return (
    <main className="relative w-screen h-svh flex justify-center items-center bg-gradient-to-t from-orange-600 to-white px-1">
      <AppHeader fullWidth={true} />

      <ReusableForm text={text} fields={fields} flag="SIGNIN" />
    </main>
  );
};

export default Login;
