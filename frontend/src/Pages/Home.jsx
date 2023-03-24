import useFetch from "../Hooks/useFetch";


const Home = () => {
  const { data, error } = useFetch("Home");

  if (data) {
    console.log(data)
    return (
      <div>
        <p className={`text-xl font-bold`}>
          hellp this is the home page
        </p>
        <pre>{data.document}</pre >
      </div>
    );
  }
};

export default Home;
