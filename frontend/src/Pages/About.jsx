import useGraphql from "../Hooks/useGraphql";
import Member from "../Components/About/member";

const About = () => {
  const reqBody = `
  {
    getAbout {
      _id
      Description
      Splash_photo_link
      Board_Members {
        Name
        Position
        Year
        Major
        Headshot_Link
      }
    }  
  }
  `

  const { data, error } = useGraphql(reqBody)
  if (data) {
    const { Description, Splash_photo_link, Board_Members } = data.data.getAbout[0];

    return (
      <div className="w-screen py-32 bg-zinc-800">
        <h1 className="text-7xl text-center">ABOUT US</h1>
        <div className="flex flex-row justify-center space-x-3 py-9">
          <div className="w-2/3 pl-3">
            <img src={Splash_photo_link} alt="Splash photo" />
          </div>
          <div className="w-1/4 flex flex-col space-y-5">
            <p className="">{Description}</p>
            <p className="">Our meetings are on Thursdays at 7pm. To see where, check out our Instagram!</p>
          </div>
          <div></div>
        </div>
        <h1 className="text-5xl pl-4 text-center">Meet Our Board!</h1>
        <div className="mt-6 grid grid-flow-row grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 justify-items-center">
          {Board_Members.map((member) => {
            return (
              <Member member={member} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default About;
