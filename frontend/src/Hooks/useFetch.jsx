import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const actualURL = "http://localhost:3000/" + String(url)

  useEffect(() => {
    fetch(actualURL)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  if(data === null) {
    return "...Loading"
  }

  return data;
};

export default useFetch;