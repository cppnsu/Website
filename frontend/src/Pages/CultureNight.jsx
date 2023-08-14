import { useState } from "react";
import useGraphql from "../Hooks/useGraphql";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

const CultureNight = () => {
  const reqBody = `
  {
    getCultureNight {
      Summary
      Date
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
  `
  // Setting up basic usage for react-pdf 
  // According to this link: https://www.npmjs.com/package/react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const { data, error } = useGraphql(reqBody)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(0)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  function handleClickPrevPdfPage() {
    if (currentPageNumber >= 2) {
      setCurrentPageNumber(currentPageNumber - 1)
    }
    else {
      console.error("Can't go below page 1")
    }
  }

  function handleClickNextPdfPage() {
    console.log(currentPageNumber)
    if (currentPageNumber === numPages) {
      console.error("Can't go above the page limit")
    }
    else {
      setCurrentPageNumber(currentPageNumber + 1)
    }
  }

  if (data) {

    const { Date, Description, English_definition, English_romaji, Featured, Gallery, Japanese_title, Price, Summary, Time_start, more_info_pdf } = data.data.getCultureNight[0]

    return (
      <div className="w-screen h-full py-32 bg-zinc-800">
        <h1 className="text-center text-7xl">CULTURE NIGHT</h1>
        <div className="w-5/6 m-auto">
          <h1>Save the date!</h1>

        </div>
        {/* PDF DIV*/}
        <div className="w-5/6 m-auto">
          <h1 className="text-center text-5xl">More Info</h1>
          <Document file={more_info_pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page renderTextLayer={false} pageNumber={currentPageNumber} />
          </Document>
          <p> Page {currentPageNumber} of {numPages} </p>
          <button
            disabled={currentPageNumber - 1 <= 0}
            onClick={handleClickPrevPdfPage}
            className="text-slate-100 bg-rose-700 text-lg w-20 h-9 rounded-full disabled:opacity-70">Prev</button>
          <button
            disabled={currentPageNumber + 1 >= numPages}
            onClick={handleClickNextPdfPage}
            className="text-slate-100 bg-rose-700 text-lg w-20 h-9 rounded-full disabled:opacity-70">Next</button>
        </div>
      </div>
    )
  }
}

export default CultureNight;
