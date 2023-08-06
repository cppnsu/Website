import EventCard from "../Components/Home/EventCard";
import useGraphql from "../Hooks/useGraphql";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

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


  if (data) {
    return (
      <div className="bg-transparent">
        <div className="w-screen h-screen">
          <img src="https://link.storjshare.io/raw/jvs45y6ikjl43gguw7pwd7n6vsca/nsu-website%2FCPP_Chirayu%20Rai.jpeg" alt="gallery image" className="object-cover blur-sm brightness-50 w-screen h-screen" />
        </div>
        <section className="bg-zinc-800">
          <h1 className="p-12 shadow text-slate-100 text-center text-2xl">Upcoming Events</h1>
          <div className="w-5/6 mx-auto">
            <div className="flex flex-row justify-between p-8">
              {data.data.threeUpcomingEvents.map((event, idx) => {
                console.log(event)
                return (
                  <EventCard key={idx} event={event} />
                )
              })}
            </div >
            <button>

            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
