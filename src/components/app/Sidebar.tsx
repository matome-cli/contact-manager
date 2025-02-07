import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { type ContactType, Action } from "../../lib/types/types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAuth } from "../../hooks/useAuth";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  contactsDispatch: React.Dispatch<Action>;
  setContactType: React.Dispatch<SetStateAction<ContactType>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  showSidebar, // used to hide the sidebar when on mobile
  setShowSidebar,
  contactsDispatch,
  setContactType,
}) => {
  const { email, logout, updateUserEmail } = useAuth();
  const { width } = useWindowSize();
  const navigate = useNavigate(); // to navigate to the login/signin page

  const isMobileSize: boolean = width < 768;

  const mobileNavigateButton: JSX.Element | null = isMobileSize ? (
    <i
      className="absolute right-1 top-1 not-italic select-none"
      onClick={() => setShowSidebar(false)}
    >
      ⬅ hide
    </i>
  ) : null;

  // js inline styles for small screens ------------------------------------------------------------------------
  const mobileSidebar: React.CSSProperties = {
    position: "absolute",
    left: "0px",
    top: "50px",
    width: "180px",
    height: "30%",
    backgroundColor: "lightgray",
    display: !showSidebar ? "none" : "flex", // starts out being false so none
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

    if (!name || !cell) {
      window.alert("Need both name and cell to create new contact");
    }

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
      className="h-full w-[15%] sidebar-rounding flex flex-col justify-center items-center gap-4 md:text-base"
      style={isMobileSize ? mobileSidebar : undefined}
    >
      {mobileNavigateButton ? mobileNavigateButton : ""}

      {/* nav bar come back and make it semantically correct */}
      <ul className="w-full space-y-3" style={isMobileSize ? navStyles : undefined}>
        <li
          onClick={handleAddContact}
          className="select-none md:text-lg"
          style={{ marginBottom: "12px" }}
        >
          Add New Contact
        </li>
        <li className="select-none md:text-lg" onClick={() => setContactType("Deleted")}>
          View Deleted Contacts
        </li>
      </ul>

      <div className="flex flex-col justify-center items-center">
        <p className={`${isMobileSize ? `-translate-x-4` : `-translate-x-9`}`}>
          Account:
        </p>
        <p
          className="text-xs text-center underline-offset-3 underline mt-4"
          onClick={() => {
            logout(); // logs out user (deny acces to private roots)
            updateUserEmail(""); // user is logged out and we now reset email to empty string
            navigate("/");
          }}
        >
          {email}
        </p>
      </div>
    </section>
  );
};

export default Sidebar;
