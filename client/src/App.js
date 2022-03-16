import "./App.css";

import { useState } from "react";
import TimeSlider from "./components/navbar/stickyNav"
import Map from "./components/map/Map";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <div className="reactive-data">
        <Map setTooltipContent={setContent} />
      </div>
      <div className="data-visualization">
        <header></header>
        <div className="graphics">
          <div className="main-chart"><canvas id="main"></canvas></div>
          <div className="secondary-chart"><canvas id="secondary"></canvas></div>
        </div>
      </div>      
    </div>
  );
}

export default App;
