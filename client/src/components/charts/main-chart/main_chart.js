import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  memo,
} from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const MainChart = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    updateData(iso_country_code) {
      console.log("updateData with iso_country_code:", iso_country_code);
    },
  }));
  return <Bar />;
});

export default memo(MainChart);
