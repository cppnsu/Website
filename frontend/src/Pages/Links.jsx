import useGraphql from "../Hooks/useGraphql";

const Links = () => {
  const reqBody = `
  {
    getLinksList {
      Name
      _id
      link_objects {
        Link
        Placeholder
      }
    }
  }
  `

  const { data, error } = useGraphql(reqBody)
  if (data) console.log(data)

  return (
    <div>
      LINKS!!!!!!!!!!
    </div>
  )
}

export default Links;
