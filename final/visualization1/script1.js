// Load JSON data
d3.json('data_viz1.json').then(function(data) {

    // Set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append the svg object to the div called 'barChart'
    const svg = d3.select("#barChart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.sex))
      .padding(0.2);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.OBS_VALUE)])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.sex))
        .attr("y", d => y(+d.OBS_VALUE))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(+d.OBS_VALUE));
});
