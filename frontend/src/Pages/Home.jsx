import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventCard from "../Components/Home/EventCard";
import useGraphql from "../Hooks/useGraphql";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Home = () => {
  const reqBody = `
  {
    getAbout {
      Description
      Gallery
      Splash_photo_link
      Signup_Link
    }
    getCultureNight {
      Description
      English_title
      Japanese_title
      Gallery
    }
    threeUpcomingEvents {
      Date_Start
      Date_End
      Location
      Name
      Photo_url
      Time_Start
      Time_End
      Sign_up_form
    }
  }`
  const { data, error } = useGraphql(reqBody)

  const navigate = useNavigate();
  const handleLearnUpcoming = () => {
    navigate('/upcoming-events')
  }
  const handleLearnAbout = () => {
    console.log("we have clicked on about button")
    navigate('/about')
  }
  const handleLearnCultureNight = () => {
    navigate('/culture-night')
  }

  const [baseIndex, setBaseIndex] = useState(0)

  if (data) {
    let cnGalleryCols = 3;
    let cnGalleryRows = 5;
    const cnGalleryLen = cnGalleryRows * cnGalleryCols;
    const galleryArr = data.data.getCultureNight[0].Gallery
    const lenGalleryArr = galleryArr.length;
    const imagesArr = []

    function cn() {
      for (let i = 0; i < 15; i++) {
        let index = baseIndex + i
        imagesArr.push(
          <img
            src={data.data.getCultureNight[0].Gallery[index % lenGalleryArr]}
            alt={`Gallery-Image-${index}`}
            className="object-cover w-full h-full"
          />
        )
      }
    }
    cn();

    return (
      <div className="bg-transparent">
        <div
          className="relative h-screen overflow-hidden bg-cover">
          <img src={data.data.getAbout[0].Gallery[0]}
            alt="gallery image"
            className="h-screen object-cover" />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "hsla(0, 0%, 0%, 0.7)" }}>
            <div className="flex h-full w-full flex-row justify-between ">
              <div className="w-1/3 h-1/3 m-auto">
                <p className="text-xl text-slate-100 drop-shadow ">Welcome to Cal Poly Pomona&apos;s</p>
                <h1 className="text-7xl text-slate-100 drop-shadow">NIKKEI STUDENT UNION</h1>
              </div>
              <div className="w-1/3 h-1/3 m-auto">
                <p className="text-xl text-slate-100 drop-shadow">{data.data.getAbout[0].Description}</p>
                <button
                  className="text-slate-100 bg-rose-700 w-32 h-10 mt-3 rounded-full text-lg"
                  onClick={handleLearnAbout}
                >
                  About us <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-slate-100 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-800 w-screen h-screen">
          <h1 className="h-1/6 p-12 shadow text-slate-100 text-center text-6xl">Upcoming Events</h1>
          <div className="w-5/6 h-4/6 mx-auto flex flex-col justify-center ">
            <div className="flex flex-row justify-between">
              {data.data.threeUpcomingEvents.map((event, idx) => {
                console.log(event)
                return (
                  <EventCard key={idx} event={event} />
                )
              })}
            </div >
          </div>
          <div className="w-full h-1/6 flex justify-center">
            <button onClick={handleLearnUpcoming} className="bg-rose-700 rounded-3xl w-44 h-14 shadow-lg text-slate-100 text-lg">
              View All Events <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        {/* CULTURE NIGHT */}
        <div className={`relative w-screen h-screen grid grid-cols-3 grid-rows-5 gap-y-1 gap-x-2 animate-fadeIn`}>
          {imagesArr.map((item) => {
            return <div className="relative h-full overflow-hidden bg-cover">{item}</div>
          })}
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
            <div className="w-screen h-screen flex flex-col justify-center">
              <div className="w-full h-1/2 bg-slate-100 opacity-90 flex flex-col justify-center ">
                <div className="h-4/5 w-full flex flex-col ">
                  <h1 className="text-6xl m-auto">{data.data.getCultureNight[0].Japanese_title} - {data.data.getCultureNight[0].English_title}</h1>
                  <p className="text-lg m-auto">{data.data.getCultureNight[0].Description}</p>
                  <button
                    className="bg-rose-700 text-lg w-36 h-9 text-slate-100 m-auto rounded-full"
                    onClick={handleLearnCultureNight}
                  >
                    Learn More <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Home;
