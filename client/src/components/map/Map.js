import React, { memo, useState, useEffect, useCallback } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { interpolateCubehelixLong } from "d3";
import TimeSlider from "../navbar/stickyNav";
import axios from "axios";
import Card from "../infoCard/card";
import "./map.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 100, 1000, 11000])
  .range(["lightgreen", "lightblue", "blue", "red"])
  .interpolate(interpolateCubehelixLong.gamma(1));

const MapChart = ({ stateChange }) => {
  const [data, setData] = useState([]);
  const [infoState, setInfoState] = useState({});

  function binarySearch(arr, x, start, end) {
    if (start > end) return false;

    let mid = Math.floor((start + end) / 2);

    if (arr[mid].iso_code === x) return arr[mid];

    if (arr[mid].iso_code > x) return binarySearch(arr, x, start, mid - 1);
    else return binarySearch(arr, x, mid + 1, end);
  }

  const changeInfoState = useCallback((newState) => setInfoState(newState));

  const changeData = useCallback((newData) => setData(newData));

  useEffect(() => {
    axios
      .get("http://localhost/api/v1", {
        params: {
          year: 2020,
          filter: "iso_code,co2",
        },
      })
      .then((res) =>
        setData(
          res.data.sort((a, b) =>
            a.iso_code > b.iso_code ? 1 : b.iso_code > a.iso_code ? -1 : 0
          )
        )
      );
  }, []);

  return (
    <>
      <div className="map-container">
        <TimeSlider parentCallback={changeData} year={2020} />
        <ComposableMap
          className="map"
          data-tip=""
          projectionConfig={{ scale: 750 }}
        >
          {data.length > 0 && (
            <ZoomableGroup center={[13, 45]}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const current = data.find(
                      (s) => s.iso_code === geo.properties.ISO_A3
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
                          setInfoState(
                            binarySearch(
                              data,
                              geo.properties.ISO_A3,
                              0,
                              data.length - 1
                            )
                          );
                          console.log(infoState);
                        }}
                        onMouseLeave={() => {}}
                        onClick={() => {
                          stateChange(geo.properties.ISO_A3);
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
      </div>
      <Card
        className="infocard"
        parentCallback={changeInfoState}
        stateInfo={infoState}
      />
    </>
  );
};

export default memo(MapChart);
