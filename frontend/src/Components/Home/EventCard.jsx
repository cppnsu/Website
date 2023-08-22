import { format } from "date-fns-tz";
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventCard = (props) => {

  const navigate = useNavigate();
  const handleClickLearnMore = () => {
    const { Name: name } = props.event;
    const url = `/upcoming-events#${String(name).replaceAll(" ", "-")}`
    console.log(url)
    navigate(url);
  }
  var isMobile = props.isMobile;
  if (isMobile) {
    return (
      <div className="relative w-11/12 h-1/3 overflow-hidden shadow-xl rounded-2xl flex flex-row m-auto">
        <img src={props.event.Photo_url} alt="A photo" className="object-cover h-48" />
        <div className="absolute text-center m-auto top-0 bottom-0 left-0 right-0 bg-black opacity-70">
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 pt-2 text-center my-auto flex flex-col space-y-2">
          <p className="font-extrabold text-2xl drop-shadow-lg ">
            {props.event.Name}
          </p>
          <p className="drop-shadow-lg">
            {props.event.Time_Start}
          </p>
          <p className="drop-shadow-lg">
            {format(Date.parse(props.event.Date_Start), 'MMMM dd, Y', { timeZone: 'America/Los_Angeles' })}
          </p>
          <p className="drop-shadow-lg">
            <FontAwesomeIcon icon={faLocationDot} />  {props.event.Location}
          </p>
          <button onClick={handleClickLearnMore}
            className="bg-rose-700 w-28 self-center text-slate-100 rounded-full p-1 text-md">
            More Info <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="relative w-1/4 h-96 bg-stone-100 overflow-hidden shadow-xl rounded-lg">
        <div className="h-48">
          <img src={props.event.Photo_url} alt="A photo" className="object-cover h-full" />
        </div>
        <div className="mt-3 flex flex-col justify-center text-center space-y-2 ">
          <p className="font-extrabold text-zinc-800 text-lg">
            {props.event.Name}
          </p>
          <p className="text-zinc-800">
            {props.event.Time_Start}
          </p>
          <p className="text-zinc-800">
            {format(Date.parse(props.event.Date_Start), 'MMMM dd, Y', { timeZone: 'America/Los_Angeles' })}
          </p>
          <p className="text-zinc-800">
            <FontAwesomeIcon icon={faLocationDot} /> {props.event.Location}
          </p>
          <button onClick={handleClickLearnMore} className="bg-rose-700 w-28 2xl:w-36 self-center text-slate-100 rounded-full p-1 text-md 2xl:text-lg">
            More Info <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }
}

export default EventCard;
