import useFetch from "./Hooks/useFetch"

function App() {
  const data = useFetch("HOME");
  console.log(data);
  return (
    <div className="w-screen h-screen bg-red-300">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
