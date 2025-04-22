// Define graph configuration objects
const graphConfigs = {
    lineGraph: {
        type: 'line',
        defaultTitle: 'Line Graph',
        renderOptions: {
            showPoints: true,
            lineColor: 'red',
            backgroundColor: 'white'
        },
        dataFormat: {
            xField: 'time',
            yField: 'value'
        }
    },
    barGraph: {
        type: 'bar',
        defaultTitle: 'Bar Graph',
        renderOptions: {
            barWidth: 0.8,
            barColor: 'blue',
            backgroundColor: 'white'
        },
        dataFormat: {
            xField: 'category',
            yField: 'value'
        }
    }
};

// Data source configurations
const dataSources = {
    csvFile: {
        type: 'csv',
        loader: async (file) => {
            // CSV loading logic here
            return parsedData;
        }
    },
    txtFile: {
        type: 'txt',
        loader: async (filePath) => {
            try {
                // Read text file from the specified directory
                const text = await fetch(filePath).then(response => response.text());

                // Parse the text file
                // Assuming each line contains x,y values separated by comma or space
                const data = text.split('\n')
                    .filter(line => line.trim() !== '')
                    .map(line => {
                        const [x, y] = line.split(/[,\s]+/);
                        return {
                            x: parseFloat(x),
                            y: parseFloat(y)
                        };
                    })
                    .filter(point => !isNaN(point.x) && !isNaN(point.y));

                return data;
            } catch (error) {
                console.error('Error reading text file:', error);
                throw error;
            }
        }
    },
    jsonApi: {
        type: 'api',
        loader: async (endpoint) => {
            // API fetching logic here
            return fetchedData;
        }
    }
};

// Event handler for dropdown changes
function handleDropdownChange(dropdownId, value) {
    switch(dropdownId) {
        case 'graphType':
            updateGraphType(value);
            break;
        case 'dataSource':
            updateDataSource(value);
            break;
        case 'variables':
            updateVariables(value);
            break;
    }
}

// Update functions
function updateGraphType(type) {
    const config = graphConfigs[type];
    if (!config) return;

    // Update graph renderer with new configuration
    graphRenderer.setType(config.type);
    graphRenderer.setOptions(config.renderOptions);

    // Update UI elements
    document.getElementById('graphTitle').value = config.defaultTitle;
}

function updateDataSource(source) {
    const dataConfig = dataSources[source];
    if (!dataConfig) return;

    // Load and process data
    dataConfig.loader()
        .then(data => {
            graphRenderer.setData(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

function updateVariables(variables) {
    // Update x and y axis labels and data mappings
    graphRenderer.setAxisLabels(variables.xLabel, variables.yLabel);
    graphRenderer.setDataMapping(variables.xField, variables.yField);
}

// Initialize dropdowns
function initializeDropdowns() {
    // Populate graph type dropdown
    const graphTypeDropdown = document.getElementById('graphType');
    Object.keys(graphConfigs).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = graphConfigs[type].defaultTitle;
        graphTypeDropdown.appendChild(option);
    });

    // Populate data source dropdown
    const dataSourceDropdown = document.getElementById('dataSource');
    Object.keys(dataSources).forEach(source => {
        const option = document.createElement('option');
        option.value = source;
        option.textContent = source;
        dataSourceDropdown.appendChild(option);
    });
}

// Export functions for use in other files
export {
    handleDropdownChange,
    initializeDropdowns,
    graphConfigs,
    dataSources
};
