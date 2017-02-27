
function renderScatterPlot(data) {
    console.log(parseSeconds(2387));
    // set up svg and bar dimensions/margins
    const width = 1000;
    const height = 500;
    const padding = 20;
    const margin = { top: 40, right: 20, bottom: 80, left: 80 };

  // append svg to DOM
  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // calculate min and max data values
  const timeMin = d3.min(data, (d) => parseSeconds(d.Seconds));
  const timeMax = d3.max(data, (d) => parseSeconds(d.Seconds));

  // set up scales
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.Year))
    .range([margin.left, width - margin.right])
    .paddingInner(0.1)

  const yScale = d3.scaleTime()
    .domain([timeMin, timeMax])
    .range([height - margin.bottom, margin.top])

  // filter data to space out x axis tick points - 1 per data point is too many
  const tickValues = xScale.domain().filter((d, i) => !(i % 2));

  // set up x and y axes
  const xAxis = d3.axisBottom(xScale)
    // .tickValues(tickValues)

  const yAxis = d3.axisLeft(yScale);

  // // calculate x and y positions for axis labels
  // const xLabelPosition = width / 2 + margin.left;
  // const yLabelPosition = height / 2 - margin.bottom;

  // append axes to svg
  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('id', 'y-axis')
}

// function that sets bar width and padding
function setBarWidth(width, data, paddingMultiplier) {
  const barWidth = width / data.length;
  const barWidthPadding = barWidth * paddingMultiplier;

  return barWidth - barWidthPadding;
}

// function for parsing and formatting dates in data
function parseAndFormat(date) {
  const parsed = d3.timeParse('%Y-%m-%d')(date)
  return formatted = d3.timeFormat('%Y')(parsed);
}

function parseSeconds(seconds) {
  const m = seconds / 60;
  const s = seconds % 60;
  const date = new Date(2016, 01, 01, 01, m, s);
  return d3.timeFormat("%M: %S")(date);
}

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', (data) => renderScatterPlot(data));
