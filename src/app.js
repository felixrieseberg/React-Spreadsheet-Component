'use strict';

var React = require('react');
var TableComponent = require('./table');

// Mock Data 
var data = {
    rows: [
        ['COM', 1, 2, 3, 4, 5, 6, 7],
        ['DIV', 1, 2, 3, 4, 5, 6, 7],
        ['DEV', 1, 2, 3, 4, 5, 6, 7],
        ['ACC', 1, 2, 3, 4, 5, 6, 7]
    ]
};

// Mock Config
var config = {
    rows: 4,
    colums: 8,
    columHead: true,
    rowHead: true
};

React.render(<TableComponent data={data} config={config} />, document.getElementById('content'));