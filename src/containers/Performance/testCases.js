import * as d3 from 'd3';
import Immutable from 'immutable';

// export default [testJSInt, testImmutableInt, testJSFloat, testJSObj];
export default [testJSInt, testJSFloat, testJSObj];
// export default [testImmutableInt];

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

export function testJSFloat(tester, svg) {
  const spec = {
    title: 'Testing JavaScript Array with 1000 Float elements',
    items: [
      { desc: 'default join', },
      { desc: 'join on index key', },
      { desc: 'join on value key', },
    ],
  };

  console.debug(spec.title);
  console.debug('***************************************************');

  var data = d3.range(0, 1000).map(Math.random);
  var index = function(d, i) { return i; };
  var accessor = function(d, i) { return d; };

  spec.items[0].time = tester(spec.items[0].desc, { svg, data, key: undefined, xAccessor: accessor });
  spec.items[1].time= tester(spec.items[1].desc, { svg, data, key: index, xAccessor: accessor });
  spec.items[2].time = tester(spec.items[2].desc, { svg, data, key: accessor, xAccessor: accessor });

  return spec;
};

export function testJSObj(tester, svg) {
  const spec = {
    title: 'Testing JavaScript Array with 1000 Object elements',
    items: [
      { desc: 'default join', },
      { desc: 'join on index key', },
      { desc: 'join on value key', },
      { desc: 'join on reference key', },
    ],
  };

  console.debug(spec.title);
  console.debug('***************************************************');

  var data = d3.range(0, 1000).map(function(d, i){
    return { x: i, y: d };
  });

  var index = function(d, i) { return i; };
  var accessor = function(d, i) { return d['x']; };
  var ref = function(d, i) { return d; };

  spec.items[0].time = tester(spec.items[0].desc, { svg, data, key: undefined, xAccessor: accessor });
  spec.items[1].time= tester(spec.items[1].desc, { svg, data, key: index, xAccessor: accessor });
  spec.items[2].time = tester(spec.items[2].desc, { svg, data, key: accessor, xAccessor: accessor });
  spec.items[3].time = tester(spec.items[3].desc, { svg, data, key: ref, xAccessor: accessor });

  return spec;
};

export function testImmutableInt(tester, svg) {
  const spec = {
    title: 'Testing Immutable IndexedSeq with 1000 Object elements',
    items: [
      { desc: 'default join', },
      { desc: 'join on index key', },
      { desc: 'join on value key', },
    ],
  };

  console.debug(spec.title);
  console.debug('***************************************************');

  var data = [Immutable.fromJS(d3.range(0, 1000))];

  var index = function(d, i) { return i; };
  var accessor = function(d, i) { return d; };

  spec.items[0].time = tester(spec.items[0].desc, { svg, data, key: undefined, xAccessor: accessor });
  spec.items[1].time= tester(spec.items[1].desc, { svg, data, key: index, xAccessor: accessor });
  spec.items[2].time = tester(spec.items[2].desc, { svg, data, key: accessor, xAccessor: accessor });

  return spec;
};