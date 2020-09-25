import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://vizhub.com/curran/datasets/auto-mpg.csv';

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const row = d => {
      // Parse the data
      d.acceleration = +d.acceleration;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.mpg = +d.mpg;
      d.weight = +d.weight;
      d.year = +d.year;

      return d;
    }

    csv(csvUrl, row)
      .then(setData);
  }, []);

  return data;
}