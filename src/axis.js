import { axisBottom, axisLeft, select } from 'd3';

export const axis = ({ selection, orientation, scale, tickSize, tickPadding = 15 }) => {

  let axisFunction;

  switch (orientation) {
    case 'left':
      axisFunction = axisLeft;
      break;
    case 'bottom':
      axisFunction = axisBottom;
      break;
    default:
      return;
  }

  // Call axis on provided selection
  select(selection)
    .call(axisFunction(scale)
      .tickSize(-tickSize)
      .tickPadding(tickPadding));
}
