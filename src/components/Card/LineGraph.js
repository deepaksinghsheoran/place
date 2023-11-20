import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineGraph = ({ data }) => {
  console.log(data);
  const chartRef = useRef();

  useEffect(() => {
    createLineChart();
  }, [data]);

  const createLineChart = () => {
    const svg = d3.select(chartRef.current);

    // Clear previous chart
    svg.selectAll("*").remove();

    // Define chart dimensions
    const margin = { top: 10, right: 20, bottom: 30, left: 30 };
    const width = 300 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    // Create a scale for mapping data values to pixel values
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    // Create a scale for mapping date values to pixel values on the x-axis
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date.getDate().toString())) // Use only the day of the month
      .range([0, width])
      .padding(0.1);

    // Create x-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
      .call(d3.axisBottom(xScale));

    // Create a line chart
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => xScale(d.date.getDate().toString()) + margin.left)
        .y(d => yScale(d.value) + margin.top)
      );

    // Add value labels
    svg.selectAll(".value-label")
      .data(data)
      .enter().append("text")
      .attr("class", "value-label")
      .attr("x", d => xScale(d.date.getDate().toString()) + margin.left)
      .attr("y", d => yScale(d.value) + margin.top - 5)
      .attr("text-anchor", "middle")
      // .text(d => d.value);
  };

  return <svg ref={chartRef} width="100%" height={150} />;
};

export default LineGraph;
