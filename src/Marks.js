export const marks = (
  selection,
  data,
  circleRadius,
  yScale,
  xScale,
  yValue,
  xValue,
) => {
  selection
    .selectAll('circle')
    .data(data)
    .attr('class', 'mark')
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)))
    .attr('r', circleRadius)
};

