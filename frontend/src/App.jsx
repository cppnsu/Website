import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
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


export default App;
