import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const AB = ({ info, handleClick }) => {
  const { Description, Gallery, Splash_photo_link, Signup_link } = info;

  // TODO: Add slideshow effect for gallery on home page
  return (
    <div className="relative h-screen min-h-full overflow-hidden bg-cover">
      <img
        src={Gallery[0]}
        alt="gallery image"
        className="h-screen object-cover xl:w-screen"
      />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{ backgroundColor: "hsla(0, 0%, 0%, 0.7)" }}
      >
        <div className="m-auto flex h-full w-full flex-col md:flex-row justify-center md:justify-between">
          <div className="w-2/3 md:w-2/5 h-1/2 m-auto flex flex-col justify-end md:justify-center">
            <p className="text-xl md:text-2xl 2xl:text-3xl text-slate-100 drop-shadow text-center">
              Welcome to Cal Poly Pomona&apos;s
            </p>
            <h1 className="text-5xl md:text-7xl 2xl:text-9xl text-slate-100 drop-shadow text-center ">
              NIKKEI STUDENT UNION
            </h1>
          </div>
          <div className="w-5/6 md:w-2/5 h-1/2 m-auto flex flex-col mt-3 md:m-auto md:justify-center md:self-center">
            <p className="text-lg text-slate-100 drop-shadow text-center">
              {Description}
            </p>
            <button
              className="text-slate-100 bg-rose-700 w-32 h-10 mt-3 rounded-full text-md block mx-auto"
              onClick={handleClick}
            >
              About us{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-slate-100 ml-1"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AB;
