import { useContext, useState } from "react";
import { EmailContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ContactDispatch, type Contact } from "../../lib/types/types";
import ReusableDialog from "./ReusableDialog";

type SidebarProps = {
  isMobileSize: boolean;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<boolean>;
  contactsDispatch: React.Dispatch<ContactDispatch>;
};

const Sidebar: React.FC<SidebarProps> = ({
  isMobileSize,
  showSidebar,
  setShowSidebar,
  contactsDispatch,
}) => {
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact>({
    name: "",
    cell: "",
  });

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
  };

  const navStyles: React.CSSProperties = {
    width: "100%",
    // backgroundColor: "lightblue",
  };

  // functions --------------------------------------------------------------
  function handleAddContact(): void {
    // show the dialog which then updates contact
    setShowDialog(true);
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
        <li
          onClick={() => contactsDispatch({ type: "SHOW_DELETED" })}
          className="select-none"
        >
          Deleted Contacts
        </li>
        <li className="select-none">Search Contacts</li>
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
      {showDialog && <ReusableDialog setShow={setShowDialog} setContact={setContact} contact={contact} contactsDispatch={contactsDispatch} />}
    </section>
  );
};

export default Sidebar;
