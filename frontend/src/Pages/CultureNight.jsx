import useGraphql from "../Hooks/useGraphql";

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
      Japanese_title
      English_title
      Gallery
      more_info_link
    }
  }
  `

  const { data, error } = useGraphql(reqBody)
  if (data) console.log(data)

  return (
    <div>
      Culture Night is super poggers
    </div>
  )
}

export default CultureNight;
