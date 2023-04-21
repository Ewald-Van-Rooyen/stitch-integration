import './App.css'
import Button from "./components/button";

function App() {
  return (
    <div className="App">
        <Button text="Click Me" onClick={()=>console.log("Hello")}/>
    </div>
  )
}

export default App
