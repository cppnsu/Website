import { useState, useEffect, useContext } from "react";
import { SiteContext } from "../SiteContext";

export default function useGraphql(reqBody) {
  const [data, setData] = useState();
  const [error, setError] = useState()
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)
  const url = "https://website-eight-sigma-79.vercel.app/graphql"

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: reqBody })
  }

  useEffect(() => {
    siteDispatch({ type: "setIsLoading", value: true })
    fetch(url, requestOptions)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log("Recieved some data: ", data)
        setData(data)
        siteDispatch({ type: "setIsLoading", value: false })
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        siteDispatch({ type: "setIsLoading", value: false })
      })

  }, [])
  return { data, error };
};
