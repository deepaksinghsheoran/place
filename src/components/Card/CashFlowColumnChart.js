import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ColumnChart = ({ data }) => {
  const chartRef = useRef(null);
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);

    
    svg.selectAll('*').remove();

    
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.inCash, d.outCash))])
      .range([height, 0]);

    
    svg.selectAll('.inCash')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'inCash')
      .attr('x', d => xScale(d.month))
      .attr('y', d => yScale(d.inCash))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.inCash))
      .attr('fill', 'lightgreen')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    
    svg.selectAll('.outCash')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'outCash')
      .attr('x', d => xScale(d.month))
      .attr('y', d => yScale(d.outCash))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.outCash))
      .attr('fill', 'darkgreen')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    
    svg.selectAll('.domain').remove();

    
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    function handleMouseOver(event, d) {
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(
        `<strong>${d.month}</strong><br>In Cash: ${d.inCash}<br>Out Cash: ${d.outCash}`
      )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    }

    function handleMouseOut() {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    }
  };

  return (
    <svg ref={chartRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>
  );
};

export default ColumnChart;
