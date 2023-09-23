import { format } from "date-fns-tz";
import { useState } from "react";
import useGraphql from "../../Hooks/useGraphql";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const CultureNight = () => {
  const reqBody = `
  {
    getCultureNight {
      Summary
      CN_Date
      Time_start
      Price
      Featured
      Description
      English_romaji
      English_definition
      Japanese_title
      Gallery
      more_info_pdf
    }
  }
  `;
  // Setting up basic usage for react-pdf
  // According to this link: https://www.npmjs.com/package/react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const { data, error } = useGraphql(reqBody);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleClickPrevPdfPage() {
    if (currentPageNumber >= 2) {
      setCurrentPageNumber(currentPageNumber - 1);
    } else {
      console.error("Can't go below page 1");
    }
  }

  function handleClickNextPdfPage() {
    console.log(currentPageNumber);
    if (currentPageNumber === numPages) {
      console.error("Can't go above the page limit");
    } else {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  }

  if (data) {
    const {
      CN_Date,
      Description,
      English_definition,
      English_romaji,
      Featured,
      Gallery,
      Japanese_title,
      Price,
      Summary,
      Time_start,
      more_info_pdf,
    } = data.data.getCultureNight[0];
    
    const cultureNightNumber = () => {
      const test = new Date();
      const currYear = test.getFullYear();
      // the number returned by month is 0-11, so we seeing if its after august when the user logs in
      if (test.getMonth() >= 7) {
        return currYear - 2008;
      } else {
        return currYear - 2009;
      }
    };

    const cnNumberString = (cnNumber) => {
      const ending = cnNumber % 10;
      switch (ending) {
        case 1:
          return `${cnNumber}st`;
        case 2:
          return `${cnNumber}nd`;
        case 3:
          return `${cnNumber}rd`;
        default:
          return `${cnNumber}th`;
      }
    };

    const numCN = () => {
      return cnNumberString(cultureNightNumber());
    };

    const formattedDate = () => {
      return String(
        format(Date.parse(CN_Date), "MMMM dd, Y", {
          timeZone: "America/Los_Angeles",
        })
      );
    };

    return (
      <div className="w-screen h-full py-32 bg-zinc-800">
        <h1 className="text-center text-7xl">CULTURE NIGHT</h1>
        <div className="w-5/6 max-w-3xl m-auto">
          <div>
            <h1 className="text-2xl mt-4 text-center">
              Join us for CPP NSU&apos;s {numCN()} annual Culture Night on{" "}
              {formattedDate()}!
            </h1>
            <h1 className="text-2xl mt-2 text-center">More info:</h1>
            {numPages > 1 && (
              <p className="mt-4">
                {" "}
                Page {currentPageNumber} of {numPages}{" "}
              </p>
            )}
            {numPages >= 1 ? (
              <Document
                file={more_info_pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={ErrorLoadingPDF}
              >
                <Page renderTextLayer={false} pageNumber={currentPageNumber} />
              </Document>
            ) : (
              <div className="w-full h-full">
                <p className="text-lg text-center">
                  We couldn&apos;t load the file, please try refreshing the page
                </p>
              </div>
            )}
            {numPages > 1 && (
              <div className="flex flex-row justify-between">
                <button
                  disabled={currentPageNumber - 1 <= 0}
                  onClick={handleClickPrevPdfPage}
                  className="text-slate-100 bg-rose-700 text-lg w-20 h-9 rounded-full disabled:opacity-70"
                >
                  Prev
                </button>
                <button
                  disabled={currentPageNumber + 1 >= numPages}
                  onClick={handleClickNextPdfPage}
                  className="text-slate-100 bg-rose-700 text-lg w-20 h-9 rounded-full disabled:opacity-70"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl text-center my-4">
              Watch last year&apos;s culture night:{" "}
            </h1>
            {/* Gotta set youtube video src to accept only embed, will regex that ish later on  */}
            <div className="w-full max-w-2xl h-1/2 flex flex-row justify-center">
              <iframe
                style={{
                  width: "100%",
                  height: "calc(100vw/1.7777777778)",
                  maxHeight: "480px",
                }}
                src="https://www.youtube.com/embed/SjZ-kQdT3tc/"
                title="Last year culture night video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="w-screen h-screen bg-zinc-800" />;
  }
};

export default CultureNight;
