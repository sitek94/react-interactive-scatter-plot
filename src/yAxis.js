import { axisLeft } from 'd3';

export const yAxis = (selection, yScale, innerWidth, tickPadding = 10) => {

  // Create axis
  const axis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(tickPadding);

  // Call axis on provided selection
  selection
    .call(axis)
}
