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
      <div className="relative w-5/12 h-96 bg-stone-100 overflow-hidden shadow-xl rounded-lg">
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
      <div className="relative w-1/4 h-96 bg-stone-100 overflow-hidden shadow-xl rounded-lg max-w-xl">
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
          <button onClick={handleClickLearnMore} className="bg-rose-700 w-28 self-center text-slate-100 rounded-full p-1 text-md">
            More Info <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }
}

export default EventCard;
