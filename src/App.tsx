import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PageNotFound from "./components/PageNotFound";
import Container from "./components/app/Container";
import { createContext, useState } from "react";

type Context = {
  // typing the value
  email: string;
  setEmail: React.Dispatch<string>;
};

export const EmailContext = createContext<Context>({
  email: "",
  setEmail: (): void => {},
});

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/manager" element={<Container />}>
            {/* children to show contact full details */}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </EmailContext.Provider>
  );
};

export default App;
