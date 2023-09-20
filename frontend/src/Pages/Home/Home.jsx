import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SiteContext } from "../../SiteContext";

import useGraphql from "../../Hooks/useGraphql";
import CN from "./CN";
import AB from "./AB";
import UP from "./UP";

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
      English_romaji
      English_definition
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
  }`;
  const { data, error } = useGraphql(reqBody);
  const { state: siteContext, dispatch: siteDispatch } = useContext(
    SiteContext
  );

  const navigate = useNavigate();
  const handleLearnUpcoming = () => {
    navigate("/upcoming-events");
  };
  const handleLearnAbout = () => {
    navigate("/about");
  };
  const handleLearnCultureNight = () => {
    navigate("/culture-night");
  };

  const [baseIndex, setBaseIndex] = useState(0);
  if (data) {
    // Seperating recieved data into each section
    const { getAbout, getCultureNight, threeUpcomingEvents } = data.data;

    return (
      <div>
        <AB info={getAbout[0]} handleClick={handleLearnAbout} />
        <UP info={threeUpcomingEvents} handleClick={handleLearnUpcoming} />
        <CN info={getCultureNight[0]} handleClick={handleLearnCultureNight} />
      </div>
    );
  }
};

export default Home;
