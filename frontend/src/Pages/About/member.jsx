

const Member = (props) => {
  const { Headshot_Link, Major, Name, Position, Year } = props.member;


  return (
    <div key={`${Name}--${Position}`} className=" w-11/12 bg-transparent overflow-hidden">
      <div key={`${Name}--${Position}--${Major}`} className="relative w-11/12">
        <img src={Headshot_Link}
          alt={`${Name}_headshot_image`}
          className="object-cover rounded" />
        <div className="absolute w-full h-full text-center bg-black left-0 right-0 top-0 bottom-0 opacity-0 hover:opacity-80 hover:transition-all duration-300 flex flex-col space-y-2 justify-center align-center ">
          <div className="">
            <h1 >Major:</h1>
            <p >{Major}</p>
          </div>
          <div className="">
            <h1>Year:</h1>
            <p >{Year}</p>
          </div>
        </div>
      </div>
      <h1 className="mt-3 text-center">{Position}</h1>
      <p className="text-center">{Name}</p>
    </div>
  )

}

export default Member;
