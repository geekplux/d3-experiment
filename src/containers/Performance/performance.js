export function tester({
  iterations,
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

export function renderD3({ data, key, xAccsessor, svg }) {
  [].concat(data).forEach(function(_data) {
    const circ = svg.selectAll("circle").data(_data, key);
    circ
      .enter()
      .append("circle")
      .attr({ cx: 50, cy: 50, r: 50, fill: "black" });
    circ.attr("fill", "red").attr("cx", xAccsessor);
    circ.exit().remove();
  });
}
