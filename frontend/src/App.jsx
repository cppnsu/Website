import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import {
  Home,
  About,
  CultureNight,
  Links,
  Layout,
  NotFound,
  UpcomingEvents,
} from "./Pages/Helper";
import { SiteContextProvider } from "./SiteContext";

function App() {
  return (
    <div>
      <SiteContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="upcoming-events" element={<UpcomingEvents />} />
              <Route path="links" element={<Links />} />
              <Route path="culture-night" element={<CultureNight />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteContextProvider>
    </div>
  );
}

export default App;
