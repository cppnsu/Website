import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  // proxy isn't working, so this makes us always ping the internal Node endpoint
  const actualURL = "https://navy-blue-bee-belt.cyclic.app/" + String(url)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(actualURL);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url])
  return { data, error };
};
