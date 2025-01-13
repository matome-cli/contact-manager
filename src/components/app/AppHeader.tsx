type AppHeaderProps = {
  shrink: boolean;
};

const AppHeader: React.FC<AppHeaderProps> = ({ shrink }) => {
  let dynamicWidth: string = shrink ? "83.333333%" : "100%";

  return (
    <header
      className="h-[50px] bg-transparent absolute top-0 right-0 pl-3 pt-1 font-semibold font-serif text-2xl"
      style={{ width: dynamicWidth }}
    >
      Contact manager
    </header>
  );
};

export default AppHeader;
