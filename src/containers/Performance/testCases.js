import * as d3 from 'd3';

export default [testJSInt];

export function testJSInt(tester, svg) {
  const spec = {
    title: 'Testing JavaScript Array with 1000 Integer elements',
    items: [
      { desc: 'default join', },
      { desc: 'join on index key', },
      { desc: 'join on value key', },
    ],
  };

  console.debug(spec.title);
  console.debug('***************************************************');

  var data = d3.range(0, 1000);
  var index = function(d, i) { return i; };
  var accessor = function(d, i) { return d; };

  spec.items[0].time = tester(spec.items[0].desc, { svg, data, key: undefined, xAccessor: accessor });
  spec.items[1].time= tester(spec.items[1].desc, { svg, data, key: index, xAccessor: accessor });
  spec.items[2].time = tester(spec.items[2].desc, { svg, data, key: accessor, xAccessor: accessor });

  return spec;
};
