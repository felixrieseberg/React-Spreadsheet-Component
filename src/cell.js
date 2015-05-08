var React = require('react');
var $ = require('jquery');

var Dispatcher = require('./dispatcher');

var CellComponent = React.createClass({
    getInitialState: function() {
        return {
            editing: this.props.editing,
            changedValue: this.props.value
        };
    },

    render: function() {
        var selected = (this.props.selected) ? 'selected' : '',
            uid = this.props.uid,
            ref = 'input_' + uid.join('_'),
            config = this.props.config,
            emptyValueSymbol = this.props.config.emptyValueSymbol || '',
            displayValue = (this.props.value === '') ? emptyValueSymbol : this.props.value,
            cellContent;

        // Check for headers
        if ((config.headRow && uid[0] === 0) || (config.headColumn && uid[1] === 0)) {
            if ((config.headRowIsString && uid[0] === 0) || (config.headColumnIsString && uid[1] === 0)) {
                return (
                    <th ref={this.props.uid.join('_')}>
                        <div>
                            <span onClick={this.handleHeadClick}>
                                {this.props.value}
                            </span>
                        </div>
                    </th>
                );
            } else {
                return (
                    <th ref={this.props.uid.join('_')}>
                        {this.props.value}
                    </th>
                );
            }
        }

        // If not a header, check for editing and return 
        if (this.props.selected && this.props.editing) {
            cellContent = (
                <input className="mousetrap"
                       onChange={this.handleChange}
                       onBlur={this.handleBlur}
                       ref={ref}
                       defaultValue={this.props.value} />
            )
        }

        return (
            <td className={selected} ref={this.props.uid.join('_')}>
                <div className="reactTableCell">
                    {cellContent}
                    <span onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>
                        {displayValue}
                    </span>
                </div>
            </td>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.editing && this.props.selected) {
            var node = React.findDOMNode(this.refs['input_' + this.props.uid.join('_')]);
            node.focus();
        }

        if (prevProps.selected && prevProps.editing && this.state.changedValue !== this.props.value) {
            this.props.onCellValueChange(this.props.uid, this.state.changedValue);
        }
    },

    handleClick: function (e) {
        var cellElement = React.findDOMNode(this.refs[this.props.uid.join('_')]);
        this.props.handleSelectCell(this.props.uid, cellElement);
    },

    handleHeadClick: function (e) {
        var cellElement = React.findDOMNode(this.refs[this.props.uid.join('_')]);
        Dispatcher.publish('headCellClicked', cellElement);
    },

    handleDoubleClick: function (e) {
        e.preventDefault();
        this.props.handleDoubleClickOnCell(this.props.uid);
    },

    handleBlur: function (e) {
        var newValue = React.findDOMNode(this.refs['input_' + this.props.uid.join('_')]).value;

        this.props.onCellValueChange(this.props.uid, newValue, e);
        Dispatcher.publish('cellBlurred', this.props.uid);
    },

    handleChange: function (e) {
        var newValue = React.findDOMNode(this.refs['input_' + this.props.uid.join('_')]).value;

        this.setState({changedValue: newValue});
    }
});

module.exports = CellComponent;