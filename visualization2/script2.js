// Define the dimensions of the SVG canvas
const width = 800; // Customize as needed
const height = 400; // Customize as needed

// Select the SVG element by its ID
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Load JSON data from the external file
d3.json('educational_data.json').then(data => {
    // Assign the loaded data to the jsonData variable
    const jsonData = data;

    // Extract the relevant data for your chart
    const years = jsonData.map(item => item.TIME_PERIOD);
    const bachelorData = jsonData.map(item => item.ED5);
    const masterData = jsonData.map(item => item.ED6);
    const phdData = jsonData.map(item => item.ED8);

    // Create scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max([d3.max(bachelorData), d3.max(masterData), d3.max(phdData)])])
        .range([height, 0]);

    // Create and append the x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    // Create and append the y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Create and append lines for each data series
    // Line for Bachelor's
    svg.append("path")
        .datum(jsonData)
        .attr("fill", "none")
        .attr("stroke", "red") // Customize the color
        .attr("stroke-width", 2) // Customize the line width
        .attr("d", d3.line()
            .x(d => xScale(d.TIME_PERIOD))
            .y(d => yScale(d.ED5))
        );

    // Line for Master's
    svg.append("path")
        .datum(jsonData)
        .attr("fill", "none")
        .attr("stroke", "blue") // Customize the color
        .attr("stroke-width", 2) // Customize the line width
        .attr("d", d3.line()
            .x(d => xScale(d.TIME_PERIOD))
            .y(d => yScale(d.ED6))
        );

    // Line for PhD
    svg.append("path")
        .datum(jsonData)
        .attr("fill", "none")
        .attr("stroke", "green") // Customize the color
        .attr("stroke-width", 2) // Customize the line width
        .attr("d", d3.line()
            .x(d => xScale(d.TIME_PERIOD))
            .y(d => yScale(d.ED8))
        );

    // Add labels, legends, and other customizations as needed
});
