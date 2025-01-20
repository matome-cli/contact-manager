import { SetStateAction, useContext } from "react";
import { EmailContext } from "../../App";
import { useNavigate } from "react-router-dom";

import { type ContactType, Action } from "../../lib/types/types";

type SidebarProps = {
  isMobileSize: boolean;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  contactsDispatch: React.Dispatch<Action>;
  setContactType: React.Dispatch<SetStateAction<ContactType>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  isMobileSize,
  showSidebar,
  setShowSidebar,
  contactsDispatch,
  setContactType,
}) => {
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();

  const mobileNavigateButton: JSX.Element | null = isMobileSize ? (
    <i
      className="absolute right-1 top-1 not-italic select-none"
      onClick={() => setShowSidebar(false)}
    >
      ⬅ hide
    </i>
  ) : null;

  // js inline styles ---------------------------------------------------------------------------
  const mobileSidebar: React.CSSProperties = {
    position: "absolute",
    left: "0px",
    top: "50px",
    width: "180px",
    height: "30%",
    backgroundColor: "lightgray",
    display: !showSidebar ? "none" : "flex", // starts out being false
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 5px",
    zIndex: 100,
  };

  const navStyles: React.CSSProperties = {
    width: "100%",
  };

  // functions --------------------------------------------------------------
  function handleAddContact(): void {
    const name: string | null = window.prompt("Contact name");
    const cell: string | null = window.prompt("Contact cell");

    if (name && cell) {
      // now we can add the contact
      contactsDispatch({ type: "ADD_CONTACT", payload: { name, cell } }); // add contact to contacts array
      setContactType("Normal"); // now we will render normal contacts in Layout.tsx after adding contact
    }
  }

  return (
    // tailwind styles will be used when is it larger than mobile on <section only>
    // only moile style that is done by tailwind CSS is the <ul>
    <section
      className="h-full w-1/5 sidebar-rounding flex flex-col justify-center items-center"
      style={isMobileSize ? mobileSidebar : undefined}
    >
      {mobileNavigateButton ? mobileNavigateButton : ""}
      <ul
        style={isMobileSize ? navStyles : undefined}
        className={isMobileSize ? "space-y-3" : undefined}
      >
        <li onClick={handleAddContact} className="select-none">
          Add New Contact
        </li>
        <li className="select-none" onClick={() => setContactType("Deleted")}>
          View Deleted Contacts
        </li>
      </ul>

      <div className="flex flex-col justify-center items-center">
        <p className=" translate-y-4">Account:</p>
        <p
          className="text-xs text-center underline-offset-3 underline mt-4"
          onClick={() => navigate("/")}
        >
          {email}
        </p>
      </div>
    </section>
  );
};

export default Sidebar;
