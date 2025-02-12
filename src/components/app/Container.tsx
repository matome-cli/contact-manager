import { useReducer, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import ContactLayout from "./Contacts/ContactsLayout";
import Input from "./Input";
import { type Contact, Action, ContactType } from "../../lib/types/types";

type State = {
  contacts: Contact[];
  deletedContacts: Contact[];
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_CONTACT":
      if (typeof action.payload === "object") {
        // then it is type Contact
        const objToReturn: State = {
          ...state,
          contacts: [...state.contacts, action?.payload],
        };
        objToReturn.contacts.sort((a, b) => a.name.localeCompare(b.name));
        return objToReturn;
      }
      return state;
    case "REMOVE_CONTACT":
      // remove the contact from one array then add it to the other
      const number: number = Number(action?.payload); // will either be a number or NaN

      if (typeof action.payload === "string" && !isNaN(number)) {
        return {
          ...state,
          contacts: state.contacts.filter(
            (contact): boolean => contact.cell !== action?.payload // exclude contact that is true
          ),
          deletedContacts: [
            // all the other deleted contacts plus one from filtering
            ...state.deletedContacts,
            ...state.contacts.filter(
              (contact): boolean => contact.cell === action?.payload
            ),
          ],
        };
      }
      return state;
    case "RESTORE_CONTACT":
      const objToReturn: State = {
        ...state,
        contacts: [
          ...state.contacts,
          ...state.deletedContacts.filter(
            (contact): boolean => contact.cell === action?.payload
          ),
        ],
        deletedContacts: state.deletedContacts.filter(
          (contact): boolean => contact.cell !== action?.payload
        ),
      };
      objToReturn.contacts.sort((a, b) => a.name.localeCompare(b.name));

      return objToReturn;
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
  const [contactType, setContactType] = useState<ContactType>("Normal"); // used to display what contact type to render
  const [contactSearch, setContactSearch] = useState<string | null>(null); // used to fileter contacts

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
      <AppHeader />
      {/* false if it is a mobile device and true if larger */}
      {mobileNavigateButton ? mobileNavigateButton : null}

      <Sidebar
        showSidebar={showSidbar}
        setShowSidebar={setShowSidebar}
        contactsDispatch={contactsDispatch}
        setContactType={setContactType} // to render the contact type in the layout
      />

      <Input setContactSearch={setContactSearch} />

      <ContactLayout
        contacts={contactsState.contacts}
        deletedContacts={contactsState.deletedContacts}
        dispatch={contactsDispatch}
        contactType={contactType}
        setContactType={setContactType}
        contactSearch={contactSearch}
      />
    </main>
  );
};

export default Container;
