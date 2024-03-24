const Navbar = () => {
  return (
    <div className="flex relative justify-start items-center shadow-xl">
      <img
        className="flex-initial w-[100px] h-[100px]"
        src="/logo.png"
        alt="logo"
      />
      <h1 className="text-gray-100">Crypto Price Tracker</h1>
    </div>
  );
};

export default Navbar;
