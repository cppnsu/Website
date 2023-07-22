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
  // TODO: Handle if have data and if not, and also handle mobile (nested if statements)

  return (
    <div>
      LINKS!!!!!!!!!!
    </div>
  )
}

export default Links;
