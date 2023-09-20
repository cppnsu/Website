import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CN = ({ info, handleClick }) => {
  const {
    Description,
    English_romaji,
    English_definition,
    Japanese_title,
    Gallery,
  } = info;

  // TODO: Add sliding carasoul effect for each row of photos on culture night section of homepage
  // TODO: Clean this function up lol
  const lenGallery = Gallery.length;
  const imagesArr = [];

  function cn() {
    for (let i = 0; i < 12; i++) {
      let index = 0 + i;
      imagesArr.push(
        <img
          src={Gallery[index % lenGallery]}
          alt={`Gallery-Image-${index}`}
          className="object-cover w-full h-full"
        />
      );
    }
  }
  cn();

  return (
    <div
      className={`relative w-screen h-screen grid grid-cols-2 gap-y-1 gap-x-2 animate-fadeIn bg-zinc-800`}
    >
      {imagesArr.map((item, idx) => {
        return (
          <div className="relative h-full overflow-hidden bg-cover" key={idx}>{item}</div>
        );
      })}
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
        <div className="w-screen h-screen flex flex-col justify-center">
          <div className="w-full bg-slate-100 opacity-95 flex flex-col justify-center">
            <div className="w-5/6 h-5/6 m-auto flex flex-col pb-12">
              <h1 className="md:hidden text-5xl text-zinc-800 font-extrabold m-auto">
                {Japanese_title}
              </h1>
              <h1 className="md:hidden text-4xl text-zinc-800 m-auto">
                {English_romaji} -{" "}
              </h1>
              <h1 className="md:hidden text-4xl text-zinc-800 m-auto">
                {English_definition}
              </h1>
              <p className="md:hidden text-md text-zinc-800 mx-auto my-3">
                {Description}
              </p>
              <h1 className="hidden md:block text-6xl 2xl:text-9xl text-zinc-800 m-auto">
                {Japanese_title} - {English_romaji} : {English_definition}
              </h1>
              <p className="hidden md:block text-lg 2xl:text-2xl text-zinc-800 m-auto">
                {Description}
              </p>
              <button
                className="bg-rose-700 text-lg 2xl:text-2xl w-36 2xl:w-48 h-9 2xl:h-10 text-slate-100 m-auto rounded-full"
                onClick={handleClick}
              >
                Learn More <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CN;
