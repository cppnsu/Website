const Header = (props) => {
  return (
    <div>
      <div className="w-screen h-1/20 bg-transparent p-1.5 flex justify-between">
          <img
            src={`https://drive.google.com/uc?export=view&id=${props.Logo_ID}`}
            alt="logo"
          />
      </div>
    </div>
  );
};

export default Header;
