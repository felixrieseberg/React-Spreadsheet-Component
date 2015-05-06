var React = require('react');
var RowComponent = require('./row');

// Mock Data
var Data = require('./data');

var TableComponent = React.createClass({

    render: function() {
        var rows = Data.projects.map(function (project) {
            return <RowComponent project={project} />;
        })

        return (
            <table>
                <tbody>
                    {{rows}}
                </tbody>
            </table>
        );
    }

});

module.exports = TableComponent;