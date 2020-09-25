import { select } from 'd3';

export const marks = ({
  ref,
  data,
  circleRadius,
  yScale,
  xScale,
  yValue,
  xValue,
}) => {
  select(ref)
    .selectAll('circle')
    .data(data)
    .attr('class', 'mark')
  .transition().duration(1000)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)))
    .attr('r', circleRadius)
};

