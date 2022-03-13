import "./App.css";

import { useState } from "react";
import ReactTooltip from "react-tooltip";
import Nav from "./components/navbar/stickyNav"
import Map from "./components/map/Map";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <div className='components'>
        <div className="Nav">
          <Nav/>
        </div>
        <Map setTooltipContent={setContent} />
      </div>  
      <ReactTooltip html={true}>{content}</ReactTooltip>
    </div>
  );
}

export default App;
