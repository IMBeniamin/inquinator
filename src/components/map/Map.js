import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#a0acb3", "#2d3033"]);

const geography_generator = (geo, setTooltipFunc) => (
  <Geography
    key={geo.rsmKey}
    geography={geo}
    onMouseEnter={() => {
      const { NAME, POP_EST } = geo.properties;
      setTooltipFunc(`${NAME} — ${rounded(POP_EST)}`);
    }}
    onMouseLeave={() => {
      setTooltipFunc("");
    }}
    style={{
      default: {
        fill: "#5c6367",
        outline: "none",
        stroke: "#000",
      },
      hover: {
        fill: "#a0acb3",
        outline: "none",
      },
      pressed: {
        fill: "#a0acb3",
        outline: "none",
      },
    }}
  />
);

const MapChart = ({ setTooltipContent }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 400 }}>
        <ZoomableGroup center={[10, 22]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) =>
                geography_generator(geo, setTooltipContent)
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
