import React, { memo, useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { interpolateCubehelixLong } from "d3";
import TimeSlider from "../navbar/stickyNav";
import Box from '@mui/material/Box';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 100, 1000, 11000])
  .range(["lightgreen", "lightblue", "blue", "red"])
  .interpolate(interpolateCubehelixLong.gamma(1));

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost/API/2020",{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
    },
    }).then(res => res.json())
    .then(data => setData(data))  
  },[]);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 750 }}>
        {data.length> 0 && (
          <ZoomableGroup center={[13, 45]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const current = data.find(
                    (s) =>
                      s.iso_code === geo.properties.ISO_A3
                    // meglio lato server passndo filtri in post/get
                  );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        console.log(geo.properties);
                        const country = geo.properties.NAME;
                        const co2 = current ? current.co2 : "No data";
                      }}
                      onMouseLeave={() => {
                        
                      }}
                      style={{
                        default: {
                          // fill: "#5c6367",
                          fill: current ? colorScale(current.co2) : "#fff",
                          outline: "none",
                          stroke: "#000",
                          strokeOpacity: 1,
                          strokeWidth: 0.01,
                        },
                        hover: {
                          fill: current ? colorScale(current.co2) : "#fff",
                          outline: "none",
                          stroke: "#fff",
                          strokeOpacity: 1,
                          strokeWidth: 2,
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#a0acb3",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        )}
      </ComposableMap>
        <TimeSlider />
    </>

  );
};

export default memo(MapChart);
