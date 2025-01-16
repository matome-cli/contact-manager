import { type Action, ContactType } from "../../../lib/types/types";

type ContactCardProps = {
  name: string;
  cell: string;
  dispatch: React.Dispatch<Action>;
  contactType: ContactType;
};

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  cell,
  dispatch, // to be added on a button click
  contactType,
}) => {
  let button: JSX.Element;

  if (contactType === "Normal") {
    button = (
      <button
        onClick={() => dispatch({ type: "REMOVE_CONTACT", payload: cell })}
        className="bg-red-500 px-1 rounded-sm w-14 text-[12px] text-white"
      >
        DELETE
      </button>
    );
  } else {
    button = (
      <button
        onClick={() => dispatch({ type: "RESTORE_CONTACT", payload: cell })}
        className="bg-green-500 px-1 rounded-sm w-14 text-[12px] text-white"
      >
        RESTORE
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg w-full flex justify-between items-center px-4 relative">
      <img src="contact.jpg" alt="image" className="w-12 h-12 block" />

      <div className="flex flex-col justify-between items-center">
        <p>{name}</p>
        <p>{cell}</p>
      </div>

      {button}
    </div>
  );
};

export default ContactCard;
