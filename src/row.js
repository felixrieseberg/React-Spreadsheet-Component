var React = require('react');
var CellComponent = require('./cell');

var RowComponent = React.createClass({
    render: function() {
        var config = this.props.config,
            cells = this.props.cells,
            colums = [],
            header = null,
            key, uid;

        if (!cells || !config.colums || cells.length !== config.colums) {
            return console.error(
                'Table Component: Number of colums in config and data mismatch.',
                'Config: Colums: ' + config.colums + ' Data: Colums: ' + cells.length
            );
        }

        // If a column head is set, create header td
        if (config.columnHead) {
            header = (<td><span>{cells[0]}</span></td>);

            // Clone array, remove first element (which was used for the head)
            cells = cells.slice(0);
            cells.shift();
        }

        for (var i = 0; i < cells.length; i++) {
            key = 'row_' + this.props.uid + '_cell_' + i;
            uid = [this.props.uid, i];
            colums.push(<CellComponent key={key} 
                                       uid={uid}
                                       value={cells[i]}
                                       onCellValueChange={this.props.onCellValueChange} />
            );
        };

        return (
            <tr>
                {header}
                {colums}
            </tr>
        );
    }

});

module.exports = RowComponent;