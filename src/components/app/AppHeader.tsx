type AppHeaderProps = {
  fullWidth?: boolean;
};

const AppHeader: React.FC<AppHeaderProps> = ({ fullWidth = false }) => {
  return (
    <header
      className={`h-[50px] bg-transparent absolute top-0 right-0 pl-3 pt-1 font-semibold font-serif text-2xl md:text-3xl w-full ${
        !fullWidth ? "md:w-[87%]" : ""
      }`}
    >
      Contact manager
    </header>
  );
};

export default AppHeader;
