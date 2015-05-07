var React = require('react');
var RowComponent = require('./row');

// Mock Data
var Data = require('./data');

var TableComponent = React.createClass({

    render: function() {
        var rows = Data.projects.map(function (project) {
            return <RowComponent project={project} key={project.name} />;
        })

        return (
            <table>
                <tbody>
                    {{rows}}
                </tbody>
            </table>
        );
    },

    updateCellValue: function () {

    }

});

module.exports = TableComponent;