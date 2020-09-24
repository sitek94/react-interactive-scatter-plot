import React, { useState } from 'react';
import { scaleLinear, extent, format } from 'd3';

import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';

// Variables
const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 50,
  right: 50,
  bottom: 80,
  left: 100,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 50;
const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' },
];

const getLabel = value => {
  for (let i = 0; i < attributes.length; i++) {
    if (value === attributes[i].value) {
      return attributes[i].label;
    }
  }
}

export const App = () => {
  // Fetch data using custom hook
  const data = useData();

  // x attribute
  const initialXAttribute = 'sepal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  // y attribute
  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) return <pre>Loading...</pre>;

  // x axis tick formatter
  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

  // x scale
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // y scale
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  return (
    <>
      <Dropdown
        id="x-select"
        options={attributes}
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <Dropdown
        id="y-select"
        options={attributes}
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      />
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={10}
          />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            radius={10}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </>
  );
};
