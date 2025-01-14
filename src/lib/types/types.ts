export type Text = {
  header: "Sign in" | "Create an account";
  button: "SIGNIN" | "CREATE ACCOUNT";
  link: "REGISTER" | "SIGNIN";
  linkTo: "/create-account" | "/";
  paragraph: "New to contact manager?" | "Already have an account?";
};

export type Field = {
  label: "Email" | "Password";
  name: string;
  inputType: "email" | "password";
};

export type AuthError = {
  email: string | null;
  password: string | null;
};

export type User = AuthError;

export type Contact = {
  name: string;
  cell: string;
};

export type ContactDispatch = {
  type:
    | "ADD_CONTACT"
    | "REMOVE_CONTACT"
    | "FILTER_CONTACT"
    | "SHOW_DELETED"
    | "RESTORE_CONTACT";
  payload?: Contact | string;
};
