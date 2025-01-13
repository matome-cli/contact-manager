import { type ContactDispatch } from "../../../lib/types/types";

type ContactCardProps = {
  name: string;
  cell: string;
  dispatch: React.Dispatch<ContactDispatch>;
};

const ContactCard: React.FC<ContactCardProps> = ({ name, cell, dispatch }) => {
  return (
    <div className="bg-white rounded-lg w-full flex justify-between items-center px-4 relative">
      <img src="contact.jpg" alt="image" className="w-12 h-12 block" />

      <div className="flex flex-col justify-between items-center">
        <p>{name}</p>
        <p>{cell}</p>
      </div>

      <button
        onClick={() => dispatch({ type: "REMOVE_CONTACT", payload: cell })}
        className="bg-red-500 px-1 rounded-sm w-14 text-[12px] text-white"
      >
        DELETE
      </button>
    </div>
  );
};

export default ContactCard;
