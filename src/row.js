var React = require('react');
var CellComponent = require('./cell');

// Mock Data
var Data = require('./data');

var RowComponent = React.createClass({
    render: function() {
        var project = this.props.project,
            colums = [],
            currentValue, key;

        colums = Data.days.map(day => {
            key = project.name + '_' + day;
            currentValue = project[day];

            return <CellComponent key={key} uid={key} value={currentValue} />;
        });

        return (
            <tr>
                <td>
                    <span>{project.name}</span>
                </td>
                {colums}
            </tr>
        );
    }

});

module.exports = RowComponent;