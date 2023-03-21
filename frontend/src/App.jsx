import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFetch from "./Hooks/useFetch";
import "./index.css";
import {
  Home,
  About,
  CultureNight,
  Links,
  Layout,
  NotFound,
} from "./Pages/Helper";

function App() {
  const { data, error } = useFetch("Home");
  if (data) {
    console.log(data.document);
    return (
      // When the data is loaded in from the databse, we can load the website and do all the fun stuff involved with that
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout {...data.document} />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="links" element={<Links />} />
              <Route path="culturenight" element={<CultureNight />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else {
    console.error(error)
  }
}

export default App;
