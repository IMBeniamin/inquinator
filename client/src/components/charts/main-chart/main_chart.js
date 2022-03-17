import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  memo,
} from "react";
// import { Bar } from "react-chartjs-2";

const MainChart = forwardRef((props, ref) => {
  useEffect(() => {});
  useImperativeHandle(ref, () => {
    const updateData = (iso_country_code) => {
      console.log("updateData with iso_country_code:", iso_country_code);
    };
  });
  //   return <Bar />;
});

export default memo(MainChart);
