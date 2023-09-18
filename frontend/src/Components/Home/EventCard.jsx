import { format } from "date-fns-tz";
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventCard = (props) => {
  const navigate = useNavigate();
  const handleClickLearnMore = () => {
    const { Name: name } = props.event;
    // Making name url compliant
    const url = `/upcoming-events#${String(name).replaceAll(" ", "-")}`
    navigate(url);
  }

  return (
    <div className="relative w-11/12 md:w-1/4 md:h-full overflow-hidden shadow-xl rounded-2xl md:rounded-lg flex flex-row md:block m-auto pb-3 md:pb-0">
      <img src={props.event.Photo_url} alt="A photo" className="object-cover h-44 w-full" />
      <div className="md:hidden absolute text-center m-auto top-0 bottom-0 left-0 right-0 bg-black opacity-70">
      </div>
      <div className="absolute md:static md:bg-slate-100 top-0 bottom-0 left-0 right-0 pt-2 text-center m-auto flex flex-col space-y-2 md:pb-2">
        <p className="font-extrabold text-2xl drop-shadow-lg md:text-xl md:text-zinc-800">
          {props.event.Name}
        </p>
        <p className="drop-shadow-lg md:text-zinc-800">
          {props.event.Time_Start}
        </p>
        <p className="drop-shadow-lg md:text-zinc-800">
          {format(Date.parse(props.event.Date_Start), 'MMMM dd, Y', { timeZone: 'America/Los_Angeles' })}
        </p>
        <p className="drop-shadow-lg md:text-zinc-800">
          <FontAwesomeIcon icon={faLocationDot} />  {props.event.Location}
        </p>
        <button onClick={handleClickLearnMore}
          className="bg-rose-700 w-28 2xl:w-36 self-center text-slate-100 rounded-full p-1 text-md 2xl:text-lg">
          More Info <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </button>
      </div>
    </div>
  )
}

export default EventCard;
