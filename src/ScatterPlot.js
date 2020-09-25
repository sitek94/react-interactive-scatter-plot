import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scaleLinear, extent } from 'd3';

import { useData } from './useData';
import { marks } from './marks';
import { Dropdown } from './Dropdown';
import { axis } from './axis';

// Variables
const width = 960;
const height = window.innerHeight;
const margin = {
  top: 20,
  right: 50,
  bottom: 130,
  left: 100,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 70;
const circleRadius = 8;

// Data attributes objects
const attributes = [
  { value: 'acceleration', label: 'Acceleration' },
  { value: 'cylinders', label: 'Cylinders' },
  { value: 'displacement', label: 'Displacement' },
  { value: 'horsepower', label: 'Horsepower' },
  { value: 'mpg', label: 'MPG' },
  { value: 'weight', label: 'Weight' },
  { value: 'year', label: 'Year' },
];

// Get label from attributes
const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

export const ScatterPlot = () => {
  // Refs for selection/transition
  const containerRef = useRef(null);
  const axisBottomRef = useRef(null);
  const axisLeftRef = useRef(null);

  // Fetch data
  const data = useData();

  // x attribute
  const initialXAttribute = 'mpg';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = useCallback((d) => d[xAttribute], [xAttribute]);
  const xAxisLabel = getLabel(xAttribute);
  // y attribute
  const initialYAttribute = 'horsepower';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = useCallback((d) => d[yAttribute], [yAttribute]);
  const yAxisLabel = getLabel(yAttribute);

  // Scales
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  // Draw function uses d3 to select all circles and axes and insert the data
  const draw = useCallback(() => {
    // Bottom axis
    axis({
      ref: axisBottomRef.current,
      orientation: 'bottom',
      scale: xScale,
      tickSize: innerHeight
    });
    // Left axis
    axis({
      ref: axisLeftRef.current,
      orientation: 'left',
      scale: yScale,
      tickSize: innerWidth
    });
    // Marks
    marks({
      ref: containerRef.current,
      data,
      circleRadius,
      yScale,
      xScale,
      yValue,
      xValue
    });
  }, [data, xValue, xScale, yValue, yScale]);

  // Draw the chart if there is data fetched
  useEffect(() => {
    if (data) draw();
  }, [draw, data]);

  // If there is no data display loading message
  if (!data) return <pre>Loading...</pre>;

  return (
    <div className="app">
      <div className="dropdown-container">
        <Dropdown
          id="y-select"
          options={attributes}
          selectedValue={yAttribute}
          onSelectedValueChange={setYAttribute}
        />
        <span className="divider">vs.</span>
        <Dropdown
          id="x-select"
          options={attributes}
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
      </div>
      <svg width={width} height={height}>
        <g ref={containerRef} transform={`translate(${margin.left},${margin.top})`}>
          <g ref={axisBottomRef} className="axis" transform={`translate(0, ${innerHeight})`}>
            <text
              className="label"
              x={innerWidth / 2}
              y={xAxisLabelOffset}
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
          </g>
          <g ref={axisLeftRef} className="axis">
            <text
              className="label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${
                innerHeight / 2
              }) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
          </g>
          {data.map((d, i) => (
            <circle key={i + d.name} />
          ))}
        </g>
      </svg>
    </div>
  );
};
