'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');

var SpreadsheetComponent = function (_Component) {
    _inherits(SpreadsheetComponent, _Component);

    function SpreadsheetComponent(props) {
        _classCallCheck(this, SpreadsheetComponent);

        var _this = _possibleConstructorReturn(this, (SpreadsheetComponent.__proto__ || Object.getPrototypeOf(SpreadsheetComponent)).call(this, props));

        var initialData = _this.props.initialData || {};

        if (!initialData.rows) {
            initialData.rows = [];

            for (var i = 0; i < _this.props.config.rows; i = i + 1) {
                initialData.rows[i] = [];
                for (var ci = 0; ci < _this.props.config.columns; ci = ci + 1) {
                    initialData.rows[i][ci] = '';
                }
            }
        }

        _this.state = {
            data: initialData,
            selected: null,
            lastBlurred: null,
            selectedElement: null,
            editing: false,
            id: _this.props.spreadsheetId || _helpers2.default.makeSpreadsheetId()
        };
        return _this;
    }

    /**
     * React 'componentDidMount' method
     */


    _createClass(SpreadsheetComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.bindKeyboard();

            $('body').on('focus', 'input', function (e) {
                $(this).one('mouseup', function () {
                    $(this).select();
                    return false;
                }).select();
            });
        }

        /**
         * React Render method
         * @return {[JSX]} [JSX to render]
         */

    }, {
        key: 'render',
        value: function render() {
            var data = this.state.data,
                config = this.props.config,
                _cellClasses = this.props.cellClasses,
                rows = [],
                key,
                i,
                cellClasses;

            // Sanity checks
            if (!data.rows && !config.rows) {
                return console.error('Table Component: Number of colums not defined in both data and config!');
            }

            // Create Rows
            for (i = 0; i < data.rows.length; i = i + 1) {
                key = 'row_' + i;
                cellClasses = _cellClasses && _cellClasses.rows && _cellClasses.rows[i] ? _cellClasses.rows[i] : null;

                rows.push(_react2.default.createElement(_row2.default, { cells: data.rows[i],
                    cellClasses: cellClasses,
                    uid: i,
                    key: key,
                    config: config,
                    selected: this.state.selected,
                    editing: this.state.editing,
                    handleSelectCell: this.handleSelectCell.bind(this),
                    handleDoubleClickOnCell: this.handleDoubleClickOnCell.bind(this),
                    handleCellBlur: this.handleCellBlur.bind(this),
                    onCellValueChange: this.handleCellValueChange.bind(this),
                    spreadsheetId: this.state.id,
                    className: "cellComponent" }));
            }

            return _react2.default.createElement("table", { tabIndex: "0", "data-spreasheet-id": this.state.id, ref: "react-spreadsheet-" + this.state.id }, _react2.default.createElement("tbody", null, rows));
        }

        /**
         * Binds the various keyboard events dispatched to table functions
         */

    }, {
        key: 'bindKeyboard',
        value: function bindKeyboard() {
            var _this2 = this;

            _dispatcher2.default.setupKeyboardShortcuts($(this.refs["react-spreadsheet-" + this.state.id])[0], this.state.id);

            _dispatcher2.default.subscribe('up_keyup', function (data) {
                _this2.navigateTable('up', data);
            }, this.state.id);
            _dispatcher2.default.subscribe('down_keyup', function (data) {
                _this2.navigateTable('down', data);
            }, this.state.id);
            _dispatcher2.default.subscribe('left_keyup', function (data) {
                _this2.navigateTable('left', data);
            }, this.state.id);
            _dispatcher2.default.subscribe('right_keyup', function (data) {
                _this2.navigateTable('right', data);
            }, this.state.id);
            _dispatcher2.default.subscribe('tab_keyup', function (data) {
                _this2.navigateTable('right', data, null, true);
            }, this.state.id);

            // Prevent brower's from jumping to URL bar
            _dispatcher2.default.subscribe('tab_keydown', function (data) {
                if ($(document.activeElement) && $(document.activeElement)[0].tagName === 'INPUT') {
                    if (data.preventDefault) {
                        data.preventDefault();
                    } else {
                        // Oh, old IE, you 💩
                        data.returnValue = false;
                    }
                }
            }, this.state.id);

            _dispatcher2.default.subscribe('remove_keydown', function (data) {
                if (!$(data.target).is('input, textarea')) {
                    if (data.preventDefault) {
                        data.preventDefault();
                    } else {
                        // Oh, old IE, you 💩
                        data.returnValue = false;
                    }
                }
            }, this.state.id);

            _dispatcher2.default.subscribe('enter_keyup', function () {
                if (_this2.state.selectedElement) {
                    _this2.setState({ editing: !_this2.state.editing });
                }
                $(_this2.refs["react-spreadsheet-" + _this2.state.id]).first().focus();
            }, this.state.id);

            // Go into edit mode when the user starts typing on a field
            _dispatcher2.default.subscribe('letter_keydown', function () {
                if (!_this2.state.editing && _this2.state.selectedElement) {
                    _dispatcher2.default.publish('editStarted', _this2.state.selectedElement, _this2.state.id);
                    _this2.setState({ editing: true });
                }
            }, this.state.id);

            // Delete on backspace and delete
            _dispatcher2.default.subscribe('remove_keyup', function () {
                if (_this2.state.selected && !_helpers2.default.equalCells(_this2.state.selected, _this2.state.lastBlurred)) {
                    _this2.handleCellValueChange(_this2.state.selected, '');
                }
            }, this.state.id);
        }

        /**
         * Navigates the table and moves selection
         * @param  {string} direction                               [Direction ('up' || 'down' || 'left' || 'right')]
         * @param  {Array: [number: row, number: cell]} originCell  [Origin Cell]
         * @param  {boolean} inEdit                                 [Currently editing]
         */

    }, {
        key: 'navigateTable',
        value: function navigateTable(direction, data, originCell, inEdit) {
            // Only traverse the table if the user isn't editing a cell,
            // unless override is given
            if (!inEdit && this.state.editing) {
                return false;
            }

            // Use the curently active cell if one isn't passed
            if (!originCell) {
                originCell = this.state.selectedElement;
            }

            // Prevent default
            if (data.preventDefault) {
                data.preventDefault();
            } else {
                // Oh, old IE, you 💩
                data.returnValue = false;
            }

            var $origin = $(originCell),
                cellIndex = $origin.index(),
                target;

            if (direction === 'up') {
                target = $origin.closest('tr').prev().children().eq(cellIndex).find('span');
            } else if (direction === 'down') {
                target = $origin.closest('tr').next().children().eq(cellIndex).find('span');
            } else if (direction === 'left') {
                target = $origin.closest('td').prev().find('span');
            } else if (direction === 'right') {
                target = $origin.closest('td').next().find('span');
            }

            if (target.length > 0) {
                target.click();
            } else {
                this.extendTable(direction, originCell);
            }
        }

        /**
         * Extends the table with an additional row/column, if permitted by config
         * @param  {string} direction [Direction ('up' || 'down' || 'left' || 'right')]
         */

    }, {
        key: 'extendTable',
        value: function extendTable(direction) {
            var config = this.props.config,
                data = this.state.data,
                newRow,
                i;

            if (direction === 'down' && config.canAddRow) {
                newRow = [];

                for (i = 0; i < this.state.data.rows[0].length; i = i + 1) {
                    newRow[i] = '';
                }

                data.rows.push(newRow);
                _dispatcher2.default.publish('rowCreated', data.rows.length, this.state.id);
                return this.setState({ data: data });
            }

            if (direction === 'right' && config.canAddColumn) {
                for (i = 0; i < data.rows.length; i = i + 1) {
                    data.rows[i].push('');
                }

                _dispatcher2.default.publish('columnCreated', data.rows[0].length, this.state.id);
                return this.setState({ data: data });
            }
        }

        /**
         * Callback for 'selectCell', updating the selected Cell
         * @param  {Array: [number: row, number: cell]} cell [Selected Cell]
         * @param  {object} cellElement [Selected Cell Element]
         */

    }, {
        key: 'handleSelectCell',
        value: function handleSelectCell(cell, cellElement) {
            _dispatcher2.default.publish('cellSelected', cell, this.state.id);
            $(this.refs["react-spreadsheet-" + this.state.id]).first().focus();

            this.setState({
                selected: cell,
                selectedElement: cellElement
            });
        }

        /**
         * Callback for 'cellValueChange', updating the cell data
         * @param  {Array: [number: row, number: cell]} cell [Selected Cell]
         * @param  {object} newValue                         [Value to set]
         */

    }, {
        key: 'handleCellValueChange',
        value: function handleCellValueChange(cell, newValue) {
            var data = this.state.data,
                row = cell[0],
                column = cell[1],
                oldValue = data.rows[row][column];

            _dispatcher2.default.publish('cellValueChanged', [cell, newValue, oldValue], this.state.id);

            data.rows[row][column] = newValue;
            this.setState({
                data: data
            });

            _dispatcher2.default.publish('dataChanged', data, this.state.id);
        }

        /**
         * Callback for 'doubleClickonCell', enabling 'edit' mode
         */

    }, {
        key: 'handleDoubleClickOnCell',
        value: function handleDoubleClickOnCell() {
            this.setState({
                editing: true
            });
        }

        /**
         * Callback for 'cellBlur'
         */

    }, {
        key: 'handleCellBlur',
        value: function handleCellBlur(cell) {
            if (this.state.editing) {
                _dispatcher2.default.publish('editStopped', this.state.selectedElement);
            }

            this.setState({
                editing: false,
                lastBlurred: cell
            });
        }
    }]);

    return SpreadsheetComponent;
}(_react.Component);

module.exports = SpreadsheetComponent;