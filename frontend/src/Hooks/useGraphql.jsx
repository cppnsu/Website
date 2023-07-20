import { useState, useEffect, useContext } from "react";
import { SiteContext } from "../SiteContext";

export default function useGraphql(reqBody) {
  const [data, setData] = useState();
  const [error, setError] = useState()
  const { state: siteContext, dispatch: siteDispatch } = useContext(SiteContext)
  const url = "http://localhost:3000/graphql"

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: reqBody })
  }

  useEffect(() => {
    siteDispatch({ type: "setLoading", value: true })
    fetch(url, requestOptions)
      .then((res) => {
        console.log("Recieved a response!")
        return res.json()
      })
      .then((data) => {
        console.log("Recieved some data: ", data)
        setData(data)
        siteDispatch({ type: "setLoading", value: false })
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        siteDispatch({ type: "setLoading", value: false })
      })

  }, [])
  return { data, error };
};
