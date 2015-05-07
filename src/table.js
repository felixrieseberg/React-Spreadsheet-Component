var React = require('react');
var RowComponent = require('./row');
var Dispatcher = require('./dispatcher');

var TableComponent = React.createClass({
    getInitialState: function() {
        var data = this.props.data;

        return {
            data: data
        };
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
    }

});

module.exports = TableComponent;