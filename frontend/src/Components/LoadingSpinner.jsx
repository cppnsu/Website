import React, { useContext } from "react";
import { SpinnerDiamond } from "spinners-react";
import { SiteContext } from "../SiteContext";

const LoadingSpinner = () => {
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)

  return (

    siteContext.isLoading ?
      <div className='flex bg-stone-900 opacity-80 w-screen h-screen z-50 absolute'>
        <SpinnerDiamond
          enabled={siteContext.isLoading}
          className='absolute bottom-1/2 left-1/2'
          size={"10%"}
          color='rgba(190,18,60)'
        />
      </div>
      :
      <div></div>

  )
}

export default LoadingSpinner;
