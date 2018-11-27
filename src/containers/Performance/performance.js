export function makeTester({
  iterations = 100,
  testFn = renderD3,
  setupFn = cleanup,
  teardownFn = cleanup
} = {}) {
  return function(name, args) {
    console.time(name);
    const startTime = window.performance.now();
    var i = 0;
    for (; i < iterations; i++) {
      if (setupFn) {
        setupFn(args);
      }
      // Run the function
      testFn(args);
      if (teardownFn) {
        teardownFn(args);
      }
    }
    console.timeEnd(name);
    const endTime = window.performance.now();
    return endTime - startTime;
  };
}

export function cleanup({ svg }) {
  svg.node().innerHTML = "";
}

export function renderD3({ data, key, color = '#fff', radius = 5, xAccessor = d => getRandomInt(200), yAccessor = d => getRandomInt(200), svg } = {}) {
  const circ = svg
    .selectAll("circle")
    .data(data, key)
    .enter()
    .append("circle");

  circ.attr({ cx: 50, cy: 50, r: 50, fill: "black" });
  circ.attr("fill", color)
    .attr("cx", xAccessor)
    .attr('cy', yAccessor)
    .attr('r', radius);

  circ.exit().remove();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
