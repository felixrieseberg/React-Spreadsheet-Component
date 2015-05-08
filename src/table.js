var React = require('react');
var $ = require('jQuery');

var RowComponent = require('./row');
var Dispatcher = require('./dispatcher');
var Helpers = require('./helpers');

var TableComponent = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData || {};

        if (!initialData.rows) {
            initialData.rows = [];

            for (var i = 0; i < this.props.config.rows; i++) {
                initialData.rows[i] = [];
                for (var ci = 0; ci < this.props.config.columns; ci++) {
                    initialData.rows[i][ci] = '';
                };
            };
        }

        return {
            data: initialData,
            selected: null,
            lastBlurred: null,
            selectedElement: null,
            editing: false
        };
    },

    componentWillMount: function () {
        this.bindKeyboard();

        Dispatcher.subscribe('cellBlurred', cell => {
            this.setState({ 
                editing: false,
                lastBlurred: cell
            });
        });
    },

    render: function() {
        var data = this.state.data,
            config = this.props.config,
            rows = [], key, i;

        // Sanity checks
        if (!data.rows || !config.rows || data.rows.length !== config.rows) {
            return console.error('Table Component: Number of rows in config and data mismatch');
        }

        // Create Rows
        for (i = 0; i < data.rows.length; i++) {
            key = 'row_' + i;
            rows.push(<RowComponent cells={data.rows[i]} 
                                    uid={i}
                                    key={key}
                                    config={config}
                                    selected={this.state.selected}
                                    editing={this.state.editing}
                                    handleSelectCell={this.handleSelectCell}
                                    handleDoubleClickOnCell={this.handleDoubleClickOnCell}
                                    onCellValueChange={this.handleCellValueChange} />);
        };

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    },

    bindKeyboard: function () {
        Dispatcher.setupKeyboardShortcuts();

        Dispatcher.subscribe('up_keyup', data => {
            this.navigateTable('up');
        });
        Dispatcher.subscribe('down_keyup', data => {
            this.navigateTable('down');
        });
        Dispatcher.subscribe('left_keyup', data => {
            this.navigateTable('left');
        });
        Dispatcher.subscribe('right_keyup', data => {
            this.navigateTable('right');
        });
        Dispatcher.subscribe('tab_keyup', data => {
            this.navigateTable('right', null, true);
        });
        
        // Prevent brower's from jumping to URL bar
        Dispatcher.subscribe('tab_keydown', data => {
            if ($(document.activeElement) && $(document.activeElement)[0].tagName === 'INPUT') {
                if (data.preventDefault) {
                    data.preventDefault();
                } else {
                    // Oh, old IE, you 💩
                    data.returnValue = false;
                } 
            } 
        });

        Dispatcher.subscribe('remove_keydown', data => {
            if (!$(data.target).is('input, textarea')) {
                if (data.preventDefault) {
                    data.preventDefault();
                } else {
                    // Oh, old IE, you 💩
                    data.returnValue = false;
                }
            }
        });

        // Go into edit mode when the user starts typing on a field
        Dispatcher.subscribe('letter_keyup', () => {
            if (!this.state.editing && this.state.selectedElement) {
                this.setState({editing: true});
            }
        });

        // Delete on backspace and delete
        Dispatcher.subscribe('remove_keyup', () => {
            if (this.state.selected && !Helpers.equalCells(this.state.selected, this.state.lastBlurred)) {
                this.handleCellValueChange(this.state.selected, '');
            }
        });
    },

    navigateTable: function(direction, originCell, inEdit) {
        // Only traverse the table if the user isn't editing a cell,
        // unless override is given
        if (!inEdit && this.state.editing) {
            return false;
        }

        // Use the curently active cell if one isn't passed
        if (!originCell) {
            originCell = this.state.selectedElement;
        }

        var $origin = $(originCell),
            cellIndex = $origin.index(),
            target;

        if (direction === 'up') {
            target = $origin.closest('tr').prev().children().eq(cellIndex).find('span');
        } else if (direction === 'down') {
            target = $origin.closest('tr').next().children().eq(cellIndex).find('span');
        } else if (direction === 'left') {
            target = $origin.closest('td').prev().find('span');
        } else if (direction === 'right') {
            target = $origin.closest('td').next().find('span');
        }

        target.click();
    },

    handleSelectCell: function (cell, cellElement) {
        Dispatcher.publish('cellSelected', cell);
        this.setState({
            selected: cell,
            selectedElement: cellElement
        });
    },

    handleCellValueChange: function (cell, newValue, e) {
        Dispatcher.publish('cellValueChanged', cell, newValue);

        var data = this.state.data,
            row = cell[0],
            column = cell[1];

        data.rows[row][column] = newValue;
        this.setState({
            data: data
        });

        Dispatcher.publish('dataChanged', data);
    },

    handleDoubleClickOnCell: function () {
        this.setState({
            editing: true
        });
    }
});

module.exports = TableComponent;