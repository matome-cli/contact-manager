import React, { useRef } from "react";
import { type Contact } from "../../lib/types/types";

type ReusableDialogProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({ setContact, setShow }) => {
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefCell = useRef<HTMLInputElement>(null);

  function handleClick(): void {
    if (inputRefCell.current && inputRefName.current) {
      setContact({ name: inputRefName.current.value, cell: inputRefCell.current.value });
      setShow(false);
    }
  }

  return (
    <form className="w-60 h-32 p-4 flex flex-col justify-center items-center bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="flex flex-col justify-start items-center">
        <label htmlFor="name">Contact Name:</label>
        <input type="text" name="" id="name" className="px-3 outline-none" />
      </div>

      <div className="flex flex-col justify-start items-center">
        <label htmlFor="name">Contact cell:</label>
        <input type="number" name="" id="name" className="px-3 outline-none" />
      </div>

      <button
        className="text-center bg-green-600 rounded-md text-white"
        onClick={handleClick}
      >
        ADD
      </button>
    </form>
  );
};

export default ReusableDialog;
