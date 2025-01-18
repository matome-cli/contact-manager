import { SetStateAction } from "react";

type InputProps = {
  //   contactSearch: string | null;
  setContactSearch: React.Dispatch<SetStateAction<string | null>>;
};

const Input: React.FC<InputProps> = ({ setContactSearch }) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setContactSearch(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search contact name"
      className="fixed top-32 left-[50%] -translate-x-[50%] w-5/6 p-2 outline-none rounded-md"
      onChange={handleChange}
    />
  );
};

export default Input;
