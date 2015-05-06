var React = require('react');
var CellComponent = require('./cell');

// Mock Data
var Data = require('./data');

var RowComponent = React.createClass({
    render: function() {
        var project = this.props.project,
            colums = [];

        colums = Data.days.map(day => {
            return <CellComponent value={2} />;
        });

        return (
            <tr>
                <td>{project.name}</td>
                {colums}
            </tr>
        );
    }

});

module.exports = RowComponent;