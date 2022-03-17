import "./App.css";

import { useCallback, useRef, useState } from "react";
import TimeSlider from "./components/navbar/stickyNav";
import Map from "./components/map/Map";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";

function App() {
  const mainChartRef = useRef();
  const stateUpdate = useCallback((state_iso_code) => {
    mainChartRef.current.updateData(state_iso_code);
  });
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <div className="reactive-data">
        <Map stateChange={stateUpdate} />
      </div>
      <div className="data-visualization">
        <header></header>
        <div className="graphics">
          <div className="main-chart">
            <MainChart ref={mainChartRef} />
          </div>
          <div className="secondary-chart">
            <SecondaryChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
