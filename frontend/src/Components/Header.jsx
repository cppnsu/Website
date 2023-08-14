import nsuLogoDark from "../assets/nsuLogoDark.svg"
import nsuLogo from "../assets/NSU_logo.png"
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const transparentNavbarStyle = "bg-transparent w-screen h-1/20 py-7 px-5 flex justify-between fixed top-0 flex-row z-30 transition duration-300"
  const fixedNavbarStyle = "bg-zinc-800 w-screen h-1/20 py-7 px-5 flex justify-between fixed top-0 flex-row z-30 transition duration-500"

  const scrolledPast = () => {
    if (window.scrollY > 80) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }
  window.addEventListener('scroll', scrolledPast);




  // Used to generate navbar links
  const navBarPages = [
    ['About', '/about'],
    ['Links', '/links'],
    ['Culture Night', '/culture-night'],
    ['Upcoming Events', '/upcoming-events'],
  ]

  // what navbar looks like on mobile
  const mobileNavPage =
    <div className="bg-rose-700 w-screen h-screen fixed inset-0 z-30">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faX} className="w-l4 h-14 px-9 py-8 text-slate-100" />
      </ button>
      <ul className="flex flex-col pl-9 py-4 ">
        {navBarPages.map(([title, url]) =>
          <li key={title} className="py-3">
            <a href={url} className={`drop-shadow rounded-lg text-4xl py-2 px-2 text-slate-100 ${location.pathname === url ? "font-semibold bg-rose-600" : "font-medium"} hover:font-bold`}>
              {title}
            </a></li>)}
      </ul>
    </div>
  // if menu is not open render nothing, otherwise render the navigation page
  const MobileBar =
    <div className="relative right">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} className=" w-7 h-7 py-5 px-4 text-rose-700" />
      </button>
      {isOpen ? mobileNavPage : null}
    </div>

  // desktop navbar on right side
  const Desktop =
    <div className="flex justify-center flex-col bg-rose-700 rounded-2xl ">
      <ul className="flex pl-9 sm:pl-0">
        {navBarPages.map(([title, url]) =>
          <li key={title} className="">
            <a href={url} className={`rounded-lg mx-2 px-1 py-2 text-slate-100 ${location.pathname === url ? "font-semibold bg-rose-500" : "font-medium"} hover:font-bold`}>
              {title}
            </a></li>)}
      </ul>
    </div>

  return (
    <div className={scrolled ? fixedNavbarStyle : transparentNavbarStyle}>
      {/* clickable logo that navigates to homepage */}
      <button className="w-16 md:hover:ring-2 ring-rose-700 rounded-full shadow-sm" onClick={() => { nav("/") }} >
        <img
          src={nsuLogo}
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
