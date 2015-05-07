var React = require('react');

var CellComponent = React.createClass({
    getInitialState: function() {
        return {
            editing: false
        };
    },

    render: function() {
        var cellContent;

        if (this.state.editing) {
            cellContent = (
                <input onBlur={this.handleBlur}
                       ref={this.props.uid}
                       placeholder={this.props.value} />
            )
        } else {
            cellContent = (
                <span onClick={this.handleClick}>
                    {this.props.value}
                </span>)
        }

        return (
            <td>
                <div>
                    {cellContent}
                </div>
            </td>
        );
    },

    componentDidUpdate: function() {
        if (this.state.editing) {
            React.findDOMNode(this.refs[this.props.uid]).focus();
        }
    },

    handleClick: function (e) {
        e.preventDefault();
        this.setState({editing: !this.state.editing});
    },

    handleBlur: function (e) {
        e.preventDefault();
        this.setState({editing: !this.state.editing});
    }

});

module.exports = CellComponent;