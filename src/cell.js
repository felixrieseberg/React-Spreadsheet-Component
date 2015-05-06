var React = require('react');

var CellComponent = React.createClass({

    render: function() {
        return (
            <td>
                <div>
                    <span>{this.props.value}</span>
                </div>
            </td>
        );
    }

});

module.exports = CellComponent;