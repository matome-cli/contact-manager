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
  let buttonAction: JSX.Element = <button></button>;

  if (contactType === "Normal") {
    buttonAction = (
      <button
        onClick={() => dispatch({ type: "REMOVE_CONTACT", payload: cell })}
        className="bg-red-500 px-1 h-7 rounded-sm w-16 text-[12px] text-white"
      >
        DELETE
      </button>
    );
  } else if (contactType === "Deleted") {
    buttonAction = (
      <button
        onClick={() => dispatch({ type: "RESTORE_CONTACT", payload: cell })}
        className="bg-green-500 px-1 h-7 rounded-sm w-16 text-[12px] text-white"
      >
        RESTORE
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg w-full h-12 flex justify-between items-center px-4 relative md:w-4/5 md:-translate-x-6">
      <img src="contact.jpg" alt="image" className="w-12 h-12 block" />

      <div className="flex flex-col justify-between items-center">
        <p>{name}</p>
        <p>{cell}</p>
      </div>

      {buttonAction}
    </div>
  );
};

export default ContactCard;
