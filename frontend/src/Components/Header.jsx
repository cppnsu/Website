import nsuLogoDark from "../assets/nsuLogoDark.svg"

const Header = () => {
  return (
    <div>
      <div className="w-screen h-1/20 bg-transparent py-3 px-5 flex justify-between">
        <button className="w-12 border-transparent" onClick={() => { }} >
          <img
            src={nsuLogoDark}
            alt="nsu_logo"
          />
        </button>
        <p>This is a test</p>
      </div>
    </div>
  );
};

export default Header;
