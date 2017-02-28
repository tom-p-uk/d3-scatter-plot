
function renderScatterPlot(data) {
  console.log(data[0]);
  // set up svg and bar dimensions/margins
  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 20, bottom: 80, left: 80 };

  // append svg to DOM
  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // for parsing time string in data and converting back to original format
  const parse = d3.timeParse('%M:%S');
  const format = d3.timeFormat('%M:%S')

  // calculate min and max data values
  const timeMin = d3.min(data, (d) => parse(d.Time));
  const timeMax = d3.max(data, (d) => parse(d.Time));

  // set up scales
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.Year))
    .range([margin.left, width - margin.right])
    .paddingInner(0.1)
    .paddingOuter(0.5)

  const yScale = d3.scaleTime()
    .domain([timeMin, timeMax])
    .range([height - margin.bottom, margin.top])

  // set up x and y axes
  const xAxis = d3.axisBottom(xScale)

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(format)


  // append axes to svg
  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('id', 'y-axis')

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.Year))
    .attr('cy', (d) => yScale(parse(d.Time)))
    .attr('r', 3)
    .style('fill', (d) => {
      if (d.Doping) return 'blue';
      else return 'orange';
    })
}

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', (data) => renderScatterPlot(data));
