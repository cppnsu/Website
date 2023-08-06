import nsuLogoDark from "../assets/nsuLogoDark.svg"
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from "react-router-dom";
import { SiteContext } from "../SiteContext";

const Header = () => {
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)
  // used to nav to homepage when clicking logo
  const nav = useNavigate();
  // used to check what current page name is 
  const location = useLocation();

  // How we manage state of mobile menu being open or not
  let [isOpen, setIsOpen] = useState(false);


  // Used to generate navbar links
  const navBarPages = [
    ['About', '/about'],
    ['Links', '/links'],
    ['Culture Night', '/culture-night'],
    ['Upcoming Events', '/upcoming-events'],
  ]

  // what navbar looks like on mobile
  const mobileNavPage =
    <div className="bg-slate-100 w-screen h-screen fixed inset-0 z-30">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faX} className="w-l4 h-14 px-9 py-8" />
      </ button>
      <ul className="flex flex-col pl-9 py-4 sm:pl-0">
        {navBarPages.map(([title, url]) =>
          <li key={title} className="py-3">
            <a href={url} className={`rounded-lg text-4xl py-2 px-2 text-slate-800 ${location.pathname === url ? "font-semibold bg-slate-200" : "font-medium"} hover:font-bold`}>
              {title}
            </a></li>)}
      </ul>
    </div>
  // if menu is not open render nothing, otherwise render the navigation page
  const MobileBar =
    <div className="relative right">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} className=" w-6 h-6 py-5 px-4" />
      </button>
      {isOpen ? mobileNavPage : null}
    </div>

  // desktop navbar on right side
  const Desktop =
    <div className="flex justify-center flex-col bg-slate-100 rounded-2xl shadow-sm">
      <ul className="flex pl-9 sm:pl-0">
        {navBarPages.map(([title, url]) =>
          <li key={title} className="">
            <a href={url} className={`rounded-lg mx-2 px-1 py-2 text-slate-700 ${location.pathname === url ? "font-semibold bg-slate-200" : "font-medium"} hover:font-bold`}>
              {title}
            </a></li>)}
      </ul>
    </div>

  return (
    <div className="bg-transparent w-screen h-1/20 py-7 px-5 flex justify-between fixed top-0 flex-row z-30">
      {/* clickable logo that navigates to homepage */}
      <button className="w-16 md:hover:ring-2 ring-rose-700 rounded-full" onClick={() => { nav("/") }} >
        <img
          src={nsuLogoDark}
          alt="nsu_logo"
        />
      </button>
      {/* navlinks */}
      {
        siteContext.isMobile ? MobileBar : Desktop
      }
    </div >
  );
};

export default Header;
