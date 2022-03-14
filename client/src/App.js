import "./App.css";

import { useState } from "react";
import TimeSlider from "./components/navbar/stickyNav"
import Map from "./components/map/Map";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <div className="reactive-data">
        <div className='map-container'>
          <Map setTooltipContent={setContent} />
        </div>
        <div className='reactive-tooltip'></div>
      </div>
      <div className="data-visualization">
        <header></header>
        <div className="graphics">
          <div className="main-chart"></div>
          <div className="secondary-chart"></div>
        </div>
      </div>      
    </div>
  );
}

export default App;
