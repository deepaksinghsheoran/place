// // Chart.js
// import React, { useEffect, useRef } from "react";
// import * as d3 from 'd3';

// const Chart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Sample data
//     const data = [10, 25, 15, 30, 20];

//     // Define chart dimensions
//     const width = 300;
//     const height = 150;

//     // Create a scale for mapping data values to pixel values
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data)])
//       .range([height, 0]);

//     // Create the SVG container
//     const svg = d3.select(chartRef.current)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height);

//     // Create bars
//     svg.selectAll("rect")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("x", (d, i) => i * (width / data.length))
//       .attr("y", d => yScale(d))
//       .attr("width", 3) // Adjust the width as needed
//       .attr("height", d => height - yScale(d));

//   }, []);

//   return <div ref={chartRef}></div>;
// };

// export default Chart;
