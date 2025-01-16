import { type Action, Contact, ContactType } from "../../../lib/types/types";

import ContactCard from "./ContactCard";

type ContactLayoutProps = {
  contacts: Contact[];
  deletedContacts: Contact[]
  dispatch: React.Dispatch<Action>; // prop drilling 1 lvl
  contactType: ContactType;
};

const ContactLayout: React.FC<ContactLayoutProps> = ({
  contacts,
  deletedContacts,
  dispatch,
  contactType,
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

  function renderContacts(): JSX.Element[] {
    if (contactType === "Normal") {
      return contactCards;
    }

    return deletedContactsCards;
  }

  return (
    <section className="w-full max-h-[80%] h-fit flex flex-col justify-start items-center space-y-4 p-2">
      {renderContacts()}
    </section>
  );
};

export default ContactLayout;
