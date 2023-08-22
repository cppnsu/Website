import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventCard from "../Components/Home/EventCard";
import useGraphql from "../Hooks/useGraphql";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SiteContext } from "../SiteContext";

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
      English_romaji
      English_definition
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
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)

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
    if (siteContext.isMobile) {
      const galleryArr = data.data.getCultureNight[0].Gallery
      const lenGalleryArr = galleryArr.length;
      const imagesArr = []

      function cn() {
        for (let i = 0; i < 12; i++) {
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
            className="relative h-screen min-h-full overflow-hidden bg-cover">
            <img src={data.data.getAbout[0].Gallery[0]}
              alt="gallery image"
              className="h-screen object-cover" />
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "hsla(0, 0%, 0%, 0.7)" }}>
              <div className="m-auto flex h-full w-full flex-col justify-center space-y-3">
                <div className="h-1/3" />
                <div className="w-2/3 h-1/3 m-auto">
                  <p className="text-lg text-slate-100 drop-shadow text-center">Welcome to Cal Poly Pomona&apos;s</p>
                  <h1 className="text-4xl text-slate-100 drop-shadow text-center">NIKKEI STUDENT UNION</h1>
                </div>
                <div className="w-5/6 h-1/3 m-auto flex flex-col justify-center">
                  <p className="text-lg text-slate-100 drop-shadow text-center">{data.data.getAbout[0].Description}</p>
                  <button
                    className="text-slate-100 bg-rose-700 w-32 h-10 mt-3 rounded-full text-md block m-auto"
                    onClick={handleLearnAbout}
                  >
                    About us <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-slate-100 ml-1" />
                  </button>
                </div>
                <div className="h-1/4" />
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 w-full h-full">
            <h1 className="h-1/6 p-6 drop-shadow text-slate-100 text-center text-6xl">Upcoming Events</h1>
            <div className="w-5/6 mx-auto flex flex-col justify-center ">
              <div className="flex flex-col space-y-4 w-full h-full">
                {data.data.threeUpcomingEvents.map((event, idx) => {
                  return (
                    <EventCard key={idx} event={event} isMobile={siteContext.isMobile} />
                  )
                })}
              </div >
            </div>
            <div className="w-full h-1/6 flex justify-center">
              <button onClick={handleLearnUpcoming} className="bg-rose-700 rounded-3xl w-44 h-14 shadow-lg text-slate-100 text-lg m-6">
                View All Events <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          {/* CULTURE NIGHT */}
          <div className={`relative w-screen h-screen grid grid-cols-2 gap-y-1 gap-x-2 animate-fadeIn bg-zinc-800`}>
            {imagesArr.map((item) => {
              return <div className="relative h-full overflow-hidden bg-cover">{item}</div>
            })}
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
              <div className="w-screen h-screen flex flex-col justify-center">
                <div className="w-full h-1/2 bg-slate-100 opacity-95 flex flex-col justify-center ">
                  <div className="h-4/5 w-full flex flex-col ">
                    <h1 className="text-6xl text-zinc-800 m-auto">{data.data.getCultureNight[0].Japanese_title}</h1>
                    <h1 className="text-5xl text-zinc-800 m-auto">{data.data.getCultureNight[0].English_romaji} - </h1>
                    <h1 className="text-5xl text-zinc-800 m-auto">{data.data.getCultureNight[0].English_definition}</h1>
                    <p className="text-lg text-zinc-800 m-auto">{data.data.getCultureNight[0].Description}</p>
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
    else {
      const galleryArr = data.data.getCultureNight[0].Gallery
      const lenGalleryArr = galleryArr.length;
      const imagesArr = []

      function cn() {
        for (let i = 0; i < 12; i++) {
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
        <div>
          <div
            className="relative h-screen overflow-hidden ">
            <img src={data.data.getAbout[0].Gallery[0]}
              alt="gallery image"
              className="h-screen object-cover xl:w-screen" />
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "hsla(0, 0%, 0%, 0.7)" }}>
              <div className="flex h-full w-full flex-row justify-between ">
                <div className="w-1/3 h-1/3 m-auto">
                  <p className="text-2xl 2xl:text-3xl text-slate-100 drop-shadow ">Welcome to Cal Poly Pomona&apos;s</p>
                  <h1 className="text-7xl 2xl:text-9xl text-slate-100 drop-shadow">NIKKEI STUDENT UNION</h1>
                </div>
                <div className="w-1/3 h-1/3 m-auto">
                  <p className="text-2xl 2xl:text-3xl text-slate-100 drop-shadow">{data.data.getAbout[0].Description}</p>
                  <button
                    className="text-slate-100 bg-rose-700 w-32 h-10 2xl:h-12 2xl:w-44 mt-3 rounded-full text-xl 2xl:text-2xl"
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
            <h1 className="h-1/6 p-12 drop-shadow text-slate-100 text-center text-6xl">Upcoming Events</h1>
            <div className="w-5/6 h-4/6 mx-auto flex flex-col justify-center max-w-5xl">
              <div className="flex flex-row justify-between ">
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
          <div className={`relative w-screen h-screen grid grid-cols-3 xl:grid-cols-4 gap-2 animate-fadeIn bg-zinc-800`}>
            {imagesArr.map((item) => {
              return <div className="relative h-full overflow-hidden bg-cover">{item}</div>
            })}
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
              <div className="w-screen h-screen flex flex-col justify-center">
                <div className="w-full h-1/2 bg-slate-100 opacity-95 flex flex-col justify-center ">
                  <div className="h-4/5 w-full flex flex-col ">
                    <h1 className="text-6xl text-zinc-800 m-auto">{data.data.getCultureNight[0].Japanese_title} - {data.data.getCultureNight[0].English_romaji} : {data.data.getCultureNight[0].English_definition}</h1>
                    <p className="text-lg text-zinc-800 m-auto">{data.data.getCultureNight[0].Description}</p>
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
}

export default Home;
