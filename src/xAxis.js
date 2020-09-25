import { axisBottom } from 'd3';

export const xAxis = (selection, xScale, innerHeight, tickPadding = 15) => {

  // Create axis
  const axis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(tickPadding);

  // Call axis on provided selection
  selection
    .call(axis)
    .attr('transform', `translate(0, ${innerHeight})`);
}
