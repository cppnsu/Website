import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns-tz";

const EventCard = ({ event }) => {
  const {
    Date_Start,
    Date_End,
    Location,
    Name,
    Photo_url,
    Time_Start,
    Time_End,
    Sign_up_form,
  } = event;

  const navigate = useNavigate();
  const handleClickLearnMore = () => {
    // Making name url compliant
    const url = `/upcoming-events#${String(Name).replaceAll(" ", "-")}`;
    navigate(url);
  };

  return (
    <div className="relative w-11/12 md:w-1/4 md:h-full overflow-hidden shadow-xl rounded-2xl md:rounded-lg flex flex-row md:block m-auto pb-3 md:pb-0">
      <img src={Photo_url} alt="A photo" className="object-cover h-44 w-full" />
      <div className="md:hidden absolute text-center m-auto top-0 bottom-0 left-0 right-0 bg-black opacity-70"></div>
      <div className="absolute md:static md:bg-slate-100 top-0 bottom-0 left-0 right-0 pt-2 text-center m-auto flex flex-col space-y-2 md:pb-2">
        <p className="font-extrabold text-2xl drop-shadow-lg md:text-xl md:text-zinc-800">
          {Name}
        </p>
        <p className="drop-shadow-lg md:text-zinc-800">{Time_Start}</p>
        <p className="drop-shadow-lg md:text-zinc-800">
          {format(Date.parse(Date_Start), "MMMM dd, Y", {
            timeZone: "America/Los_Angeles",
          })}
        </p>
        <p className="drop-shadow-lg md:text-zinc-800">
          <FontAwesomeIcon icon={faLocationDot} /> {Location}
        </p>
        <button
          onClick={handleClickLearnMore}
          className="bg-rose-700 w-28 2xl:w-36 self-center text-slate-100 rounded-full p-1 text-md 2xl:text-lg"
        >
          More Info <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

const UP = ({ info, handleClickAllEvents }) => {
  return (
    <div className="bg-zinc-800 w-full h-4/5 md:h-screen pb-6 md:pb-0">
      <h1 className="h-1/6 p-6 drop-shadow text-slate-100 text-center text-6xl">
        Upcoming Events
      </h1>
      <div className="w-5/6 h-4/6 mx-auto flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 w-full ">
          {info.map((event, idx) => {
            return <EventCard key={idx} event={event} />;
          })}
        </div>
      </div>
      <div className="h-1/6 flex justify-center m-auto mt-6 md:mt-0">
        <button
          onClick={handleClickAllEvents}
          className="bg-rose-700 rounded-3xl w-44 2xl:w-56 h-14 2xl:h-15 shadow-lg text-slate-100 text-lg 2xl:text-2xl m-auto"
        >
          View All Events <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default UP;
