import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SiteContext } from "../../SiteContext";
import { Dropdown } from "antd";
// import Dropdown from "antd/es/dropdown/dropdown";

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

  if (data) {
    // Seperating recieved data into each section
    const { getAbout, getCultureNight, threeUpcomingEvents } = data.data;
    // If you are going to pass in a menu prop, the items list NEEDS to be named items.
    // Easiest way to do that is to just have your seperate names beforehand, and when
    // passing menu props, just do items:whateverNameOfYorList
    

    // TODO: Add in admin view ONLY after we set the site context to that shit
    const items = [
      {
        label: "1st menu item",
        key: "1",
      },
      {
        label: "2nd menu item",
        key: "2",
      },
      {
        label: "3rd menu item",
        key: "3",
      },
    ];

    return (
      <div>
        <Dropdown
          menu={{
            items,
            onClick: (e) => {
              console.log(e.key);
            },
          }}
          trigger={["contextMenu"]}
        >
          {/* If you want to have a context menu on top of a nested component, it needs to be surrounded in a div   */}
          <div>
            <AB info={getAbout[0]} handleClick={handleLearnAbout} />
          </div>
        </Dropdown>
        <UP info={threeUpcomingEvents} handleClick={handleLearnUpcoming} />
        <CN info={getCultureNight[0]} handleClick={handleLearnCultureNight} />
      </div>
    );
  }
};

export default Home;
