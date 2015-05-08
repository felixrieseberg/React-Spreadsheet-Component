'use strict';

var React = require('react');
var TableComponent = require('./src/table');

// Mock Data 
var mockData = {
    rows: [
        ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        ['COM', 1, 2, 3, 4, 5, 6, 7],
        ['DIV', 1, '', 3, 4, 5, 6, 7],
        ['DEV', 1, 2, 3, 4, 5, 6, 7],
        ['ACC', 1, 2, 3, 4, 5, 6, 7]
    ]
};

var config = {
    rows: 5,
    columns: 8,
    headColumn: true,
    headColumnIsString: true,
    headRow: true,
    headRowIsString: true,
    canAddRow: true,
    canAddColumn: true,
    emptyValueSymbol: '-'
};

React.render(<TableComponent initialData={mockData} config={config} />, document.getElementById('content'));