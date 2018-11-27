import { randomNum } from "../../utils";

export function makeTester({
  testFn = renderD3,
  setupFn = cleanup,
  teardownFn
} = {}) {
  return function(name, args) {
    console.time(name);
    const startTime = window.performance.now();
    if (setupFn) {
      setupFn(args);
    }
    // Run the function
    testFn(args);
    if (teardownFn) {
      teardownFn(args);
    }
    console.timeEnd(name);
    const endTime = window.performance.now();
    return endTime - startTime;
  };
}

export function cleanup({ svg }) {
  svg.node().innerHTML = "";
}

export function renderD3({
  data,
  key,
  color = "#fff",
  radius = 2,
  xAccessor = d => randomNum(200),
  yAccessor = d => randomNum(200),
  svg
} = {}) {
  const circ = svg
    .selectAll("circle")
    .data(data, key)
    .enter()
    .append("circle");

  circ.attr({ cx: 50, cy: 50, r: 50, fill: "black" });
  circ
    .attr("fill", color)
    .attr("cx", xAccessor)
    .attr("cy", yAccessor)
    .attr("r", radius);
}
