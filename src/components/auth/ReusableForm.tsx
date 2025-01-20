import { Link, useNavigate } from "react-router-dom";
import { type User, Field, Text, AuthError } from "../../lib/types/types";
import { useContext, useRef, useState } from "react";
import { isValidEmail, resetInputs } from "../../lib/utils/utils";
import { EmailContext } from "../../App";

type ReusableFormProps = {
  text: Text;
  fields: Field[];
  flag: "SIGNIN" | "REGISTER";
};

type LocalStorageUser = User;

const ReusableForm: React.FC<ReusableFormProps> = ({ text, fields, flag }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const [user, setUser] = useState<User>({
    email: null,
    password: null,
  });

  const [error, setError] = useState<AuthError>({
    email: null,
    password: null,
  });

  const { setEmail } = useContext(EmailContext);

  const navigate = useNavigate();

  // -----------------------------------------------------------------------------------------------------

  const fieldsBlock: JSX.Element[] = fields.map(
    (field, index): JSX.Element => (
      <div key={index} className="flex-col justify-center items-center gap-y-1 w-10/12">
        <label className="md:text-2xl">{field.label + ":"}</label>
        <input
          type={field.inputType}
          name={field.name}
          placeholder={getPlaceholder(field.name)}
          className="rounded-2xl outline-none focus:outline-orange-700 py-1 px-2 mt-1 w-full placeholder:text-orange-600 md:h-11 md:text-xl"
          ref={(el: HTMLInputElement) => {
            if (el) inputRefs.current[index] = el;
          }}
          onChange={field.name === "email" ? handleChangeEmail : handleChangePassword}
        />
      </div>
    )
  );

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  }

  // when there are errors this is the function that will display them on the inputs
  function getPlaceholder(fieldName: string): string {
    if (fieldName === "email") {
      return error.email || "";
    }

    return error.password || "";
  }

  // a helper function for the function prop only checks if the user's input is not empty and email is valid (handles error state)
  function inputValidation(): boolean {
    if (
      // check if they are null or if the length of each is not 0 (if the user typed nothing)
      !(user.email && user.password) ||
      user.email.length <= 0 ||
      user.password.length <= 0
    ) {
      return false;
    }

    // now they have typed something check if the email is valid
    if (isValidEmail(user.email) && user.password.length > 0) {
      return true;
    }

    return false;
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault(); // Prevent page reload

    // manual form validation === pain
    if (!inputValidation()) {
      // makes sure inputs are not empty by cheching and that the email is valid
      resetInputs(inputRefs);
      setError({
        email: "Enter valid email",
        password: "Enter password",
      });
      return;
    }

    // TypeScript guarantees user.email and user.password are not null due to inputValidation function
    const email: string = user.email!;
    const password: string = user.password!;

    // getting the above variables so that i dont have to reference the object the whole time

    if (flag === "SIGNIN") {
      // Retrieve user from local storage
      const userData: string | null = localStorage.getItem(email); // can't confirm that it will be found

      if (!userData) {
        // User does not exist in local storage
        resetInputs(inputRefs);
        setError({ email: "Create an account", password: "" });
        return;
      }

      // when user exists in local storage
      const userObject: LocalStorageUser = JSON.parse(userData); // local storage stores strings so turn it to a js object

      // Check if password matches
      if (userObject.password === password) {
        // user has been authenticated
        setEmail(user.email!);
        navigate("/manager"); // the actual app component
      } else {
        // Passwords do not match
        inputRefs.current[1].value = "";
        setError({ email: "", password: "Incorrect password" });
      }
    } else if (flag === "REGISTER") {
      // check if user exists in local storage to prompt them to sign in
      const userExists = localStorage.getItem(email);

      if (userExists) {
        // User already exists
        resetInputs(inputRefs);
        setError({ email: "Account already exists, sign in!", password: "" });
      } else {
        // Save new user to local storage (local storage returns null)
        const newUser: LocalStorageUser = { email, password };
        localStorage.setItem(email, JSON.stringify(newUser));

        // Navigate to success page or dashboard
        setEmail(user.email!);
        navigate("/manager");
      }
    }
  }

  return (
    <form className="flex flex-col justify-center items-center h-2/3 w-full px-1 bg-transparent lg:gap-6 xl:w-1/2 ">
      <h1 className="font-extrabold text-3xl text-center md:text-5xl">{text.header}</h1>

      <div className="flex flex-col justify-center items-center gap-y-3 px-3 py-3 w-full">
        {fieldsBlock}
      </div>

      <button
        type="submit"
        className="text-white font-semibold bg-orange-700 rounded-md w-40 text-center mt-4 outline-none py-2 px-1 md:w-56 md:h-12 md:text-2xl"
        onClick={handleSubmit}
      >
        {text.button}
      </button>

      <p className="font-semibold text-center mt-3 md:text-xl lg:text-xl">
        {text.paragraph}
        <Link
          to={text.linkTo}
          className="text-orange-700 ml-2 lg:hover:underline decoration-wavy "
        >
          {text.link}
        </Link>
      </p>
    </form>
  );
};

export default ReusableForm;

// need to pass state from parent
