import { SetStateAction } from "react";
import { type Action, Contact, ContactType } from "../../../lib/types/types";
import ContactCard from "./ContactCard";

type ContactLayoutProps = {
  contacts: Contact[];
  deletedContacts: Contact[];
  dispatch: React.Dispatch<Action>; // prop drilling 1 lvl
  contactType: ContactType;
  setContactType: React.Dispatch<SetStateAction<ContactType>>;
  contactSearch: string | null;
};

const ContactLayout: React.FC<ContactLayoutProps> = ({
  contacts,
  deletedContacts,
  dispatch,
  contactType,
  setContactType,
  contactSearch,
}) => {
  const contactCards = contacts.map(
    (contact, i): JSX.Element => (
      <ContactCard
        key={i}
        name={contact.name}
        cell={contact.cell}
        dispatch={dispatch}
        contactType="Normal"
      />
    )
  );

  const deletedContactsCards = deletedContacts.map(
    (contact, i): JSX.Element => (
      <ContactCard
        key={i + 1000}
        name={contact.name}
        cell={contact.cell}
        dispatch={dispatch}
        contactType="Deleted"
      />
    )
  );

  function renderContacts(): JSX.Element[] | JSX.Element {
    if (contactType === "Normal") {
      if (!contactSearch) return contactCards; // if search is null return all contactsCards as they are

      // apparently i can use reduce to do more than accumulate which would make this O(n) instead of this O(2n) solution
      return contacts
        .filter((contact): boolean =>
          contact.name.toLocaleLowerCase().includes(contactSearch.toLocaleLowerCase())
        )
        .map(
          (contact, i): JSX.Element => (
            <ContactCard
              key={i + 70}
              cell={contact.cell}
              name={contact.name}
              contactType="Normal"
              dispatch={dispatch}
            />
          )
        );
    }

    if (deletedContacts.length === 0) {
      return (
        <p>
          No deleted contacts{" "}
          <span
            className="text-orange-700 underline"
            onClick={() => setContactType("Normal")}
          >
            View contacts
          </span>
        </p>
      );
    }

    if (contactType === "Deleted") {
      if (!contactSearch) return deletedContactsCards;

      return deletedContacts
        .filter((delContact): boolean =>
          delContact.name.toLocaleLowerCase().includes(contactSearch.toLocaleLowerCase())
        )
        .map(
          (delContact, i): JSX.Element => (
            <ContactCard
              key={i + 432}
              cell={delContact.cell}
              name={delContact.name}
              dispatch={dispatch}
              contactType="Deleted"
            />
          )
        );
    }

    return (
      <p className="text-red-500 text-3xl font-black ">
        Error: renderContacts function in ContactsLayout.tsx!
      </p>
    );
  }

  return (
    <section className="w-full max-h-[40%] overflow-auto h-fit flex flex-col justify-start items-center space-y-4 p-2">
      {renderContacts()}
    </section>
  );
};

export default ContactLayout;
