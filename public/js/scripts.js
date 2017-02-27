const renderScatterPlot(data) {
  console.log(typeof data[0].year);
  // set up svg and bar dimensions/margins
  const width = 1000;
  const height = 500;
  const padding = 20;
  const margin = { top: 40, right: 20, bottom: 80, left: 80 };

  function setBarWidth(width, data, paddingMultiplier) {
    const barWidth = width / data.length;
    const barWidthPadding = barWidth * paddingMultiplier;

    return barWidth - barWidthPadding;
  }


  // append svg to DOM
  const svg = d3.select('.svg-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
}

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', (res) => console.log(res))
