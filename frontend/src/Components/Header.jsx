import nsuLogoDark from "../assets/nsuLogoDark.svg"
import { useNavigate } from "react-router-dom";


const Header = () => {

  const nav = useNavigate();

  return (
    <div className="bg-transparent">
      <div className="w-screen h-1/20 bg-transparent py-3 px-5 flex justify-between">
        {
          // adding clickable logo that navigates to homepage
        }
        <button className="w-16 hover:ring-2 ring-rose-700 rounded-full" onClick={() => { nav("/") }} >
          <img
            src={nsuLogoDark}
            alt="nsu_logo"
          />
        </button>
        <div className="flex flex-col justify-center sm:bg-gray-500 sm:">
          <div className="flex space-x-3">
            <nav className="flex sm:justify-center" >
              {[
                ['About', '/about'],
                ['Links', '/links'],
                ['Culture Night', '/culture-night'],
                ['Upcoming Events', '/upcoming-events'],
              ].map(([title, url]) => (
                <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
