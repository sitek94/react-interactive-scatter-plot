import { axisBottom, axisLeft, select } from 'd3';

export const axis = ({ ref, orientation, scale, tickSize, tickPadding = 15 }) => {
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

  // Call axis on provided ref
  select(ref)
    .call(axisFunction(scale)
      .tickSize(-tickSize)
      .tickPadding(tickPadding));
}
