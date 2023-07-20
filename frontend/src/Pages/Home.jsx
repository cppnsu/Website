import useGraphql from "../Hooks/useGraphql";

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
    }
  }`
  const { data, error } = useGraphql(reqBody)
  if (data) console.log(data)


  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-cover bg-fixed">
      <img src="https://link.storjshare.io/raw/jvs45y6ikjl43gguw7pwd7n6vsca/nsu-website%2FCPP_Chirayu%20Rai.jpeg" alt="gallery image" className="bg-cover" />
    </div>
  );
}

export default Home;
