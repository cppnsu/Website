import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { SiteContext } from "../SiteContext";

const Layout = () => {

  /*** MOBILE VIEW CONTEXT UPDATE ***/
  // Updating the mobile view condition here since it's the parent to everything else
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)
  const mobileWidthBreakpoint = 768;

  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth < mobileWidthBreakpoint;
      if (isMobile !== siteContext.isMobile) {
        siteDispatch({ type: "setIsMobile", value: isMobile });
      }
    }

    window.addEventListener('resize', handleResize);

    // Call handleResize once immediately to set initial state
    handleResize();

    // Remove event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, [siteContext.isMobile, siteDispatch, mobileWidthBreakpoint]);


  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
