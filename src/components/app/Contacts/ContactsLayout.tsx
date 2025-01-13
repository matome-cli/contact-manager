import { ContactDispatch, type Contact } from "../../../lib/types/types";
import ContactCard from "./ContactCard";

type ContactLayoutProps = {
  contacts: Contact[];
  dispatch: React.Dispatch<ContactDispatch> // prop drilling 1 lvl
};

const ContactLayout: React.FC<ContactLayoutProps> = ({ contacts, dispatch }) => {
  const contactCards = contacts.map(
    (contact, i): JSX.Element => (
      <ContactCard key={i} name={contact.name} cell={contact.cell} dispatch={dispatch} />
    )
  );


  return (
    <section className="w-full max-h-[80%] h-fit flex flex-col justify-start items-center space-y-4 p-2">
      {contactCards}
    </section>
  );
};

export default ContactLayout;
