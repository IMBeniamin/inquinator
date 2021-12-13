import "./App.css";

import { useState } from "react";
import ReactTooltip from "react-tooltip";

import Map from "./components/map/Map";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <Map setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
