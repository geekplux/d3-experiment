import * as d3 from 'd3';
import { randomNum } from '../../utils';

export default function ({ tester, svg, count = 1000, size = 500 } = {}) {
  const spec = {
    title: `Testing ${count} elements rendered by d3`,
    items: [
      { desc: 'default join', },
      { desc: 'join on index key', },
      { desc: 'join on reference key', },
    ],
  };

  console.debug(spec.title);
  console.debug('***************************************************');

  const data = d3.range(0, count).map((d, i) => ({ index: i, x: randomNum(size), y: randomNum(size) }));

  const index = (d, i) => { return i; };
  const xAccessor = d => d.x;
  const yAccessor = d => d.y;
  const ref = d => d;

  spec.items[0].time = tester(spec.items[0].desc, { svg, data, key: undefined, xAccessor, yAccessor });
  spec.items[1].time= tester(spec.items[1].desc, { svg, data, key: index, xAccessor, yAccessor });
  spec.items[2].time = tester(spec.items[2].desc, { svg, data, key: ref, xAccessor, yAccessor });

  return spec;
};