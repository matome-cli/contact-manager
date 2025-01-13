import AppHeader from "../app/AppHeader";
import ReusableForm from "./ReusableForm";
import { type Text, type Field } from "../../lib/types/types";

const Signup: React.FC = () => {
  const text: Text = {
    header: "Create an account",
    button: "CREATE ACCOUNT",
    link: "SIGNIN",
    linkTo: "/",
    paragraph: "Already have an account?",
  };

  const fields: Field[] = [
    { label: "Email", inputType: "email", name: "email" },
    { label: "Password", inputType: "password", name: "password" },
  ];

  return (
    <main className="w-full h-dvh relative bg-gradient-to-t from-orange-600 to-white flex justify-center items-center px-1">
      <AppHeader shrink={false} />

      <ReusableForm text={text} fields={fields} flag="REGISTER" />
    </main>
  );
};

export default Signup;
