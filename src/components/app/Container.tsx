import { useReducer, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import ContactLayout from "./Contacts/ContactsLayout";
import { type Contact } from "../../lib/types/types";

type State = {
  contacts: Contact[];
  deletedContacts: Contact[];
};

type Action = {
  type: "ADD_CONTACT" | "REMOVE_CONTACT" | "FILTER_CONTACT" | "SHOW_DELETED";
  payload?: Contact | string;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_CONTACT":
      if (typeof action.payload === "object") {
        // then it is type Contact
        const objToReturn: State = {
          ...state,
          contacts: [...state.contacts, action.payload],
        };
        objToReturn.contacts.sort((a, b) => a.name.localeCompare(b.name));
        return objToReturn;
      }
      return state;
    case "REMOVE_CONTACT":
      // remove the contact from one array then add it to the other
      const number: number = Number(action.payload); // will either be a number or NaN

      if (typeof action.payload === "string" && !isNaN(number)) {
        return {
          ...state,
          contacts: state.contacts.filter(
            (contact): boolean => contact.cell !== action.payload
          ),
          deletedContacts: state.contacts.filter(
            (contact): boolean => contact.cell === action.payload
          ),
        };
      }
      return state;
    case "SHOW_DELETED":
      window.alert(state.deletedContacts.length + " deleted contacts");
      return state;
    default:
      return state;
  }
}

const initialContactState: State = {
  contacts: [],
  deletedContacts: [],
};

const Container: React.FC = () => {
  const { width } = useWindowSize();

  const isMobileSize: boolean = width < 768; // when large we shrink app header to make space for side bar
  const [showSidbar, setShowSidebar] = useState<boolean>(!isMobileSize); // only used for mobile view (false)

  // becuase there will be more actions for one state var use useReducer (migrate to it)
  const [contactsState, contactsDispatch] = useReducer(reducer, initialContactState);

  const mobileNavigateButton: JSX.Element | null = isMobileSize ? (
    <i
      className="absolute top-12 left-1 not-italic select-none"
      onClick={() => setShowSidebar(!showSidbar)}
    >
      options ➡
    </i>
  ) : null;

  return (
    <main className="w-full h-dvh relative flex justify-start items-center bg-gradient-to-t from-orange-600 to-white pt-[50px] px-2">
      {/* app header is not a flex item its position fixed */}
      <AppHeader shrink={!isMobileSize} />
      {/* false if it is a mobile device and true if larger */}
      {mobileNavigateButton ? mobileNavigateButton : null}

      <Sidebar
        isMobileSize={isMobileSize}
        showSidebar={showSidbar}
        setShowSidebar={setShowSidebar}
        contactsDispatch={contactsDispatch!}
      />

      <ContactLayout contacts={contactsState.contacts} dispatch={contactsDispatch} />
    </main>
  );
};

export default Container;
