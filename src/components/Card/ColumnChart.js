import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ColumnChart = ({ data }) => {
  console.log(data);
  const chartRef = useRef();

  useEffect(() => {
    createColumnChart();
  }, [data]);

  const createColumnChart = () => {
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

    // Create a scale for mapping labels to pixel values on the x-axis
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.1);

    // Create x-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));

    // Create a bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.label) + margin.left)
      .attr("y", d => yScale(d.value) + margin.top)
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.value));
  };

  return <svg ref={chartRef} width={300} height={150} />;
};

export default ColumnChart;
