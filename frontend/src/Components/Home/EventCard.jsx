import { format } from "date-fns-tz";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventCard = (props) => {

  const navigate = useNavigate();
  const handleClickLearnMore = () => {
    const { Sign_up_form: signUp } = props.event;
    console.log(signUp)
    navigate(signUp);
  }
  return (
    <div className="relative w-1/4  h-96 bg-stone-100 overflow-hidden shadow-xl rounded-lg">
      <div className="h-52">
        <img src={props.event.Photo_url} alt="A photo" className="object-cover h-full" />
      </div>
      <div className="mt-3 flex flex-col justify-center text-center space-y-2 ">
        <p className="font-extrabold text-lg">
          {props.event.Name}
        </p>
        <p>
          {props.event.Time_Start}
        </p>
        <p>
          {format(Date.parse(props.event.Date_Start), 'MMMM dd, Y', { timeZone: 'America/Los_Angeles' })}
        </p>
        <p>
          {props.event.Location}
        </p>
        <button onClick={handleClickLearnMore} className="bg-rose-700 w-32 self-center text-slate-100 rounded">
          Learn More <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 " />
        </button>
      </div>
    </div>
  )
}

export default EventCard;
