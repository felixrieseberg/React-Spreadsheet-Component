var Mousetrap = require('mousetrap');

var dispatcher = {

    // Event Pub/Sub System
    topics: {},

    /**
     * Subscribe to an event
     * @param  {[string]} topic    [The topic subscribing to]
     * @param  {[function]} listener [The callback for published events]
     */
    subscribe: function(topic, listener) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        this.topics[topic].push(listener);
    },

    /**
     * Publish to an event channel
     * @param  {[string]} topic [The topic publishing to]
     * @param  {[object]} data  [An object passed to the subscribed callbacks]
     */
    publish: function(topic, data) {
        // return if the topic doesn't exist, or there are no listeners
        if(!this.topics[topic] || this.topics[topic].length < 1) return;

        this.topics[topic].forEach(function(listener) {
            listener(data || {});
        });
    },

    keyboardShortcuts: [
        ['down', ['down', 'enter']],
        ['up', 'up'],
        ['left', 'left'],
        ['right', 'right'],
        ['tab', 'tab']
    ],
    
    setupKeyboardShortcuts: function () {
        var self = this;

        this.keyboardShortcuts.map(function (shortcut) {
            var shortcutName = shortcut[0],
                shortcutKey = shortcut[1];

            Mousetrap.bind(shortcutKey, function (e) {
                e.preventDefault();
                self.publish(shortcutName, e);
            }, 'keyup');
        });
    },

    cellValueChangeHandler: function (cell, newValue, e) {
        var data = this.state.data,
            row = cell[0],
            column = cell[1];

        data.rows[row][column] = newValue;
        this.setState({
            data: data
        });
    },
};

module.exports = dispatcher;