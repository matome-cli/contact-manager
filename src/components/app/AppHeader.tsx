type AppHeaderProps = {
  shrink: boolean;
};

const AppHeader: React.FC<AppHeaderProps> = ({ shrink }) => {
  return (
    <header
      className={`h-[50px] bg-transparent absolute top-0 right-0 pl-3 pt-1 font-semibold font-serif text-2xl md:text-3xl ${
        shrink ? "lg:w-[80%]" : "w-full"
      }`}
    >
      Contact manager
    </header>
  );
};

export default AppHeader;
