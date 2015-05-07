var dispatcher = {
    cellValueChangeHandler: function (cell, newValue, e) {
        var data = this.state.data,
            row = cell[0],
            column = cell[1];

        data.rows[row][column] = newValue;
        this.setState({
            data: data
        });
    }
};

module.exports = dispatcher;