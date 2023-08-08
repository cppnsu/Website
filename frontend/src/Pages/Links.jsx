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
  if (data) {
    const links = data.data.getLinksList
    return (
      <div className="w-screen flex flex-col justify-evenly bg-zinc-800 py-40 space-y-8">
        {
          links.map((link, idx) => {
            return (
              <div
                className="m-auto w-5/6 text-center"
                key={`${link.Name}--${idx}`}>
                <h1 className="text-slate-100 text-6xl">{link.Name}</h1>
                <div className="flex flex-col space-y-3 mt-4">
                  {link.link_objects.map((obj, idx) => {
                    return <div
                      className="p-3 border border-slate-100 rounded-full text-slate-100 hover:text-zinc-800 text-center hover:bg-slate-100 hover:transition hover:duration-300"
                      key={`${obj.Placeholder}--${idx}`}
                      onClick={() => { window.location.assign(obj.Link) }}>
                      <p className=" text-2xl ">{obj.Placeholder}</p>
                    </div>
                  })}
                </div>
              </div>
            )
          }
          )
        }
      </div>
    )
  }
}

export default Links;
