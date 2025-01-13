import React, { useRef } from "react";
import { type ContactDispatch, Contact } from "../../lib/types/types";

type ReusableDialogProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  contact: Contact;
  contactsDispatch: React.Dispatch<ContactDispatch>;
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  setContact,
  setShow,
  contactsDispatch,
  contact,
}) => {
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefCell = useRef<HTMLInputElement>(null);

  function handleClick(): void {
    if (inputRefCell.current && inputRefName.current) {
      setContact({ name: inputRefName.current.value, cell: inputRefCell.current.value });
      setShow(false);
      contactsDispatch({ type: "ADD_CONTACT", payload: contact });
    }
  }

  return (
    <form className="w-72 h-32 p-4 flex flex-col justify-center items-center bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded">
      <div className="flex flex-col justify-start items-center">
        <label htmlFor="name">Contact Name:</label>
        <input type="text" name="" id="name" className="px-3 outline-none" />
      </div>

      <div className="flex flex-col justify-start items-center">
        <label htmlFor="name">Contact cell:</label>
        <input type="number" name="" id="name" className="px-3 outline-none" />
      </div>

      <button
        className="text-center bg-green-600 rounded-md text-white w-11"
        onClick={handleClick}
      >
        ADD
      </button>
    </form>
  );
};

export default ReusableDialog;
