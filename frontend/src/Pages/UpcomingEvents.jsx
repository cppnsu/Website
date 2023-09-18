import useGraphql from "../Hooks/useGraphql";
import { format } from "date-fns-tz";
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const reqBody = `
  {
    upcomingEvents {
      _id
      Name
      Date_Start
      Date_End
      Time_Start
      Time_End
      Location
      More_Info
      Photo_url
      Member_Price
      Non_Member_Price
      Sign_up_form
    }
  }
  `

  const { data, error } = useGraphql(reqBody)
  // TODO: Handle if have data and if not, and also handle mobile (nested if statements)
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      // Using setTimeout to ensure React has rendered the page
      setTimeout(() => {
        const elem = document.querySelector(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" });
        }
      }, 0);
    }
  }, [data]); // Run once after the initial render


  // Adding the navigate directly in onClick cause it's just one line
  const navigate = useNavigate();

  if (data) {
    console.log(data)
    const events = data.data.upcomingEvents
    return (
      <div className=" w-screen h-max bg-zinc-800 py-32">
        <h1 className="text-slate-100 text-6xl text-center pb-8">UPCOMING EVENTS</h1>
        {
          events.map((event) => {
            return (
              <div key={`${event.Name}--${event.Time_Start}`} className="h-1/3 w-4/5 mx-auto py-3">
                <a id={String(event.Name).replaceAll(" ", "-")}></a>
                <div className="flex flex-row justify-center align-middle">
                  <div className=" mt-6 shadow bg-rose-700 w-32 h-32 flex flex-col justify-center ">
                    <h1 className="drop-shadow-lg text-slate-100 text-3xl text-center">{format(Date.parse(event.Date_Start), 'MMM', { timeZone: 'America/Los_Angeles' })}</h1>
                    <h1 className="drop-shadow-lg text-slate-100 text-5xl text-center ">{format(Date.parse(event.Date_Start), 'd', { timeZone: 'America/Los_Angeles' })}</h1>
                  </div>
                  <div className="w-4/5 h-full flex flex-col space-y-3 ml-10 ">
                    <h1 className="text-slate-100 text-4xl">{event.Name}</h1>
                    <div>
                      <p className="text-slate-100 text-xl">{event.Time_End ? `${event.Time_Start} - ${event.Time_End}` : `${event.Time_Start}`}</p>
                      <p className="text-slate-100 text-xl"><FontAwesomeIcon icon={faLocationDot} /> {event.Location}</p>
                    </div>
                    <div>
                      <p className="text-slate-100">{`Non Member Price: $${event.Non_Member_Price}`}</p>
                      <p className="text-slate-100">{event.Member_Price ? `Member Price: $${event.Member_Price}` : ""}</p>
                    </div>
                    <p className="text-slate-100">{event.More_Info}</p>
                    <button
                      onClick={() => {
                        const url = `/links#${String(event.Name).replaceAll(" ", "-")}`
                        console.log(url)
                        navigate(url)
                      }}
                      className="text-slate-100 bg-rose-700 w-28 h-8 rounded-full text-xl">Sign up <FontAwesomeIcon icon={faArrowRight} /></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UpcomingEvents;
