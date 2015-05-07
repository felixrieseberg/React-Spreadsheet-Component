var React = require('react');
var $ = require('jQuery');

var RowComponent = require('./row');
var Dispatcher = require('./dispatcher');
var Helpers = require('./helpers');

var TableComponent = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData;

        return {
            data: initialData,
            cursor: null
        };
    },

    componentWillMount: function () {
        this.bindKeyboard();
    },

    render: function() {
        var data = this.state.data,
            config = this.props.config,
            rows = [], key, i;

        if (!data.rows || !config.rows || data.rows.length !== config.rows) {
            return console.error('Table Component: Number of rows in config and data mismatch');
        }

        for (i = 0; i < data.rows.length; i++) {
            key = 'row_' + i;
            rows.push(<RowComponent cells={data.rows[i]} 
                                    uid={i}
                                    key={key}
                                    config={config}
                                    onCellValueChange={Dispatcher.cellValueChangeHandler.bind(this)} />);
        };

        return (
            <table>
                <tbody>
                    {{rows}}
                </tbody>
            </table>
        );
    },

    bindKeyboard: function () {
        Dispatcher.setupKeyboardShortcuts();

        Dispatcher.subscribe('up', data => this.navigateTable('up', Helpers.firstTDinArray(data.path)));
        Dispatcher.subscribe('down', data => this.navigateTable('down', Helpers.firstTDinArray(data.path)));
        Dispatcher.subscribe('left', data => this.navigateTable('left', Helpers.firstTDinArray(data.path)));
        Dispatcher.subscribe('right', data => this.navigateTable('right', Helpers.firstTDinArray(data.path)));
    },

    leftHandler: function (data) {
        var cell = Helpers.firstTDinArray(data.path);
        
        if (cell) {
            this.navigateTable('down', cell);
        }
    },

    navigateTable: function(direction, originCell) {
        if (!originCell) {
            return;
        }

        var $origin = $(originCell),
            cellIndex = $origin.index();

        if (direction === 'up') {
            return $origin.closest('tr').prev().children().eq(cellIndex).find('span').click();
        }

        if (direction === 'down') {
            return $origin.closest('tr').next().children().eq(cellIndex).find('span').click();
        }

        if (direction === 'left') {
            return $origin.closest('td').prev().find('span').click();
        }

        if (direction === 'right') {
            return $origin.closest('td').next().find('span').click();
        }

    }

});

module.exports = TableComponent;