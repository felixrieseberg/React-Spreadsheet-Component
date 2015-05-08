# React Spreadsheet
This is a spreadsheet component built in Facebook's React.

![Screenshot](https://raw.githubusercontent.com/felixrieseberg/React-Spreadsheet-Component/master/.reactspreadsheet.gif)

## Usage
The component is initialized with a configuration object. If desired, initial data for the spreadsheet can be passed in as an array of rows. In addition, you can pass in a second array filled with class names for each cell, allowing you to style each cell differently.

```
var SpreadsheetComponent = require('./src/spreadsheet');

React.render(<TableComponent initialData={initialData} config={config} />, document.getElementsByTagName('body'));
```

##### Configuration Object
```js
var config = {
    // Number of rows
    rows: 5,
    // Number of columns
    columns: 8,
    // True if the first column in each row is a header (th)
    headColumn: true,
    // True if the data for the first column is just a string.
    // Set to false if you want to pass custom DOM elements.
    headColumnIsString: true,
    // True if the first row is a header (th)
    headRow: true,
    // True if the data for the cells in the first row contains strings.
    // Set to false if you want to pass custom DOM elements.
    headRowIsString: true,
    // True if the user can add rows (by navigating down from the last row)
    canAddRow: true,
    // True if the user can add columns (by navigating right from the last column)
    canAddColumn: true,
    // Override the display value for an empty cell
    emptyValueSymbol: '-'
};
```

##### Initial Data Object
The initial data object contains an array `rows`, which itself contains an array for every single row. Each index in the array represents a cell. It is used by the component to pre-populate the cells with data. Be aware that user input is not written to this object, as it is merely used in initialization to populate the state. If you want to capture user input, read below.

```js
var data = {
    rows: [
        ['Key', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'],
        ['COM', '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6'],
        ['DIV', '1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6'],
        ['DEV', '2,0', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6'],
        ['ACC', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6']
    ]
};
```

##### Cell Classes Object
You can assign custom classes to individual cells. Follow the same schema as for the initial data object.

```js
var classes = {
    rows: [
        ['', 'specialHead', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', 'error', '', '', '', '', '', ''],
        ['', 'error changed', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ]
};
```

## Data Lifecycle
User input is not written to the `initialData` object, as it is merely used in initialization to populate the state. If you want to capture user input, subscribe callbacks to the `cellValueChanged` and `dataChanged` events on the dispatcher. 

##### Get the full data state after each change
```js
var Dispatcher = require('./src/dispatcher');

Dispatcher.subscribe('dataChanged', function (data) {
    ...
})
```
##### Get the data change before state change
```js
var Dispatcher = require('./src/dispatcher');

Dispatcher.subscribe('cellValueChanged', function (cell, newValue) {
    // Cell: An array indicating the cell position by row/column, ie: [1,1]
    // newValue: The new value for that cell
})
```