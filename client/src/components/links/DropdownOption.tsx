function DropdownOption({
  name,
  icon,
  handleDropDown,
  handleSelectedPlatform,
}: {
  name: string;
  icon: JSX.Element;
  handleDropDown: () => void;
  handleSelectedPlatform: (platform: string) => void;
}) {
  const onClick = () => {
    handleSelectedPlatform(name);
    handleDropDown();
  };

  return (
    <div
      onClick={onClick}
      className="w-full flex gap-3 border-b border-solid border-main-lgray bg-white items-center text-main-gray group transition-all cursor-pointer  pb-5 hover:text-main"
    >
      {icon}
      <span className="group-hover:text-main text-sm text-gray">{name}</span>
    </div>
  );
}
export default DropdownOption;
