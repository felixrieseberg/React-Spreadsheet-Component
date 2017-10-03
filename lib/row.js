'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RowComponent = function (_Component) {
    _inherits(RowComponent, _Component);

    function RowComponent() {
        _classCallCheck(this, RowComponent);

        return _possibleConstructorReturn(this, (RowComponent.__proto__ || Object.getPrototypeOf(RowComponent)).apply(this, arguments));
    }

    _createClass(RowComponent, [{
        key: 'render',

        /**
         * React Render method
         * @return {[JSX]} [JSX to render]
         */
        value: function render() {
            var config = this.props.config,
                cells = this.props.cells,
                columns = [],
                key,
                uid,
                selected,
                cellClasses,
                i;

            if (!config.columns || cells.length === 0) {
                return console.error('Table can\'t be initialized without set number of columsn and no data!');
            }

            for (i = 0; i < cells.length; i = i + 1) {
                // If a cell is selected, check if it's this one
                selected = _helpers2.default.equalCells(this.props.selected, [this.props.uid, i]);
                cellClasses = this.props.cellClasses && this.props.cellClasses[i] ? this.props.cellClasses[i] : '';

                key = 'row_' + this.props.uid + '_cell_' + i;
                uid = [this.props.uid, i];
                columns.push(_react2.default.createElement(_cell2.default, { key: key,
                    uid: uid,
                    value: cells[i],
                    config: config,
                    cellClasses: cellClasses,
                    onCellValueChange: this.props.onCellValueChange,
                    handleSelectCell: this.props.handleSelectCell,
                    handleDoubleClickOnCell: this.props.handleDoubleClickOnCell,
                    handleCellBlur: this.props.handleCellBlur,
                    spreadsheetId: this.props.spreadsheetId,
                    selected: selected,
                    editing: this.props.editing }));
            }

            return _react2.default.createElement("tr", null, columns);
        }
    }]);

    return RowComponent;
}(_react.Component);

module.exports = RowComponent;