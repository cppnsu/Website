import useGraphql from "../Hooks/useGraphql";

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

  return (
    <div>
      What?? There are events???? AND theyre upcoming????!?!? SIGN ME UP BABY
    </div>
  )
}

export default UpcomingEvents;
