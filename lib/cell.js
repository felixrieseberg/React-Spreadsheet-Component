'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellComponent = function (_Component) {
    _inherits(CellComponent, _Component);

    function CellComponent(props) {
        _classCallCheck(this, CellComponent);

        var _this = _possibleConstructorReturn(this, (CellComponent.__proto__ || Object.getPrototypeOf(CellComponent)).call(this, props));

        _this.state = {
            editing: _this.props.editing,
            changedValue: _this.props.value
        };
        return _this;
    }

    /**
     * React "render" method, rendering the individual cell
     */


    _createClass(CellComponent, [{
        key: 'render',
        value: function render() {
            var props = this.props,
                selected = props.selected ? 'selected' : '',
                ref = 'input_' + props.uid.join('_'),
                config = props.config || { emptyValueSymbol: '' },
                displayValue = props.value === '' || !props.value ? config.emptyValueSymbol : props.value,
                cellClasses = props.cellClasses && props.cellClasses.length > 0 ? props.cellClasses + ' ' + selected : selected,
                cellContent;

            // Check if header - if yes, render it
            var header = this.renderHeader();
            if (header) {
                return header;
            }

            // If not a header, check for editing and return
            if (props.selected && props.editing) {
                cellContent = _react2.default.createElement("input", { className: "mousetrap",
                    onChange: this.handleChange.bind(this),
                    onBlur: this.handleBlur.bind(this),
                    ref: ref,
                    defaultValue: this.props.value });
            }

            return _react2.default.createElement("td", { className: cellClasses, ref: props.uid.join('_') }, _react2.default.createElement("div", { className: "reactTableCell" }, cellContent, _react2.default.createElement("span", { onDoubleClick: this.handleDoubleClick.bind(this), onClick: this.handleClick.bind(this) }, displayValue)));
        }

        /**
         * React "componentDidUpdate" method, ensuring correct input focus
         * @param  {React previous properties} prevProps
         * @param  {React previous state} prevState
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.editing && this.props.selected) {
                var node = this.refs['input_' + this.props.uid.join('_')];
                node.focus();
            }

            if (prevProps.selected && prevProps.editing && this.state.changedValue !== this.props.value) {
                this.props.onCellValueChange(this.props.uid, this.state.changedValue);
            }
        }

        /**
         * Click handler for individual cell, ensuring navigation and selection
         * @param  {event} e
         */

    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var cellElement = this.refs[this.props.uid.join('_')];
            this.props.handleSelectCell(this.props.uid, cellElement);
        }

        /**
         * Click handler for individual cell if the cell is a header cell
         * @param  {event} e
         */

    }, {
        key: 'handleHeadClick',
        value: function handleHeadClick(e) {
            var cellElement = this.refs[this.props.uid.join('_')];
            _dispatcher2.default.publish('headCellClicked', cellElement, this.props.spreadsheetId);
        }

        /**
         * Double click handler for individual cell, ensuring navigation and selection
         * @param  {event} e
         */

    }, {
        key: 'handleDoubleClick',
        value: function handleDoubleClick(e) {
            e.preventDefault();
            this.props.handleDoubleClickOnCell(this.props.uid);
        }

        /**
         * Blur handler for individual cell
         * @param  {event} e
         */

    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var newValue = this.refs['input_' + this.props.uid.join('_')].value;

            this.props.onCellValueChange(this.props.uid, newValue, e);
            this.props.handleCellBlur(this.props.uid);
            _dispatcher2.default.publish('cellBlurred', this.props.uid, this.props.spreadsheetId);
        }

        /**
         * Change handler for an individual cell, propagating the value change
         * @param  {event} e
         */

    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var newValue = this.refs['input_' + this.props.uid.join('_')].value;
            this.setState({ changedValue: newValue });
        }

        /**
         * Checks if a header exists - if it does, it returns a header object
         * @return {false|react} [Either false if it's not a header cell, a react object if it is]
         */

    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var props = this.props,
                selected = props.selected ? 'selected' : '',
                uid = props.uid,
                config = props.config || { emptyValueSymbol: '' },
                displayValue = props.value === '' || !props.value ? config.emptyValueSymbol : props.value,
                cellClasses = props.cellClasses && props.cellClasses.length > 0 ? this.props.cellClasses + ' ' + selected : selected;

            // Cases
            var headRow = uid[0] === 0,
                headColumn = uid[1] === 0,
                headRowAndEnabled = config.hasHeadRow && uid[0] === 0,
                headColumnAndEnabled = config.hasHeadColumn && uid[1] === 0;

            // Head Row enabled, cell is in head row
            // Head Column enabled, cell is in head column
            if (headRowAndEnabled || headColumnAndEnabled) {
                if (headColumn && config.hasLetterNumberHeads) {
                    displayValue = uid[0];
                } else if (headRow && config.hasLetterNumberHeads) {
                    displayValue = _helpers2.default.countWithLetters(uid[1]);
                }

                if (config.isHeadRowString && headRow || config.isHeadColumnString && headColumn) {
                    return _react2.default.createElement("th", { className: cellClasses, ref: this.props.uid.join('_') }, _react2.default.createElement("div", null, _react2.default.createElement("span", { onClick: this.handleHeadClick.bind(this) }, displayValue)));
                } else {
                    return _react2.default.createElement("th", { ref: this.props.uid.join('_') }, displayValue);
                }
            } else {
                return false;
            }
        }
    }]);

    return CellComponent;
}(_react.Component);

module.exports = CellComponent;