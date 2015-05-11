var Mousetrap = require('mousetrap');

var dispatcher = {

    // Event Pub/Sub System
    // 
    // Topics used:
    // [headCellClicked] - A head cell was clicked
    //      @return {array} [row, column]
    // [cellSelected] - A cell was selected
    //      @return {array} [row, column]
    // [cellBlur] - A cell was blurred
    //      @return {array} [row, column]
    // [cellValueChanged] - A cell value changed.
    //      @return {cell, newValue} Origin cell, new value entered
    // [dataChanged] - Data changed
    //      @return {data} New data
    // [editStarted] - The user started editing
    //      @return {cell} Origin cell
    // [editStopped] - The user stopped editing
    //      @return {cell} Origin cell
    // [rowCreated] - The user created a row
    //      @return {number} Row index
    // [columnCreated] - The user created a column
    //      @return {number} Column index
    topics: {},

    /**
     * Subscribe to an event
     * @param  {string} topic    [The topic subscribing to]
     * @param  {function} listener [The callback for published events]
     * @param  {string} reactId [The reactId (data-reactid) of the origin element]
     */
    subscribe: function(topic, listener, reactId) {
        if (!this.topics[reactId]) {
            this.topics[reactId] = [];
        }

        if (!this.topics[reactId][topic]) {
            this.topics[reactId][topic] = [];
        }

        this.topics[reactId][topic].push(listener);
    },

    /**
     * Publish to an event channel
     * @param  {string} topic [The topic publishing to]
     * @param  {object} data  [An object passed to the subscribed callbacks]
     * @param  {string} reactId [The reactId (data-reactid) of the origin element]
     */
    publish: function(topic, data, reactId) {
        // return if the topic doesn't exist, or there are no listeners
        if(!this.topics[reactId] || !this.topics[reactId][topic] || this.topics[reactId][topic].length < 1) return;

        this.topics[reactId][topic].forEach(function(listener) {
            listener(data || {});
        });
    },

    keyboardShortcuts: [
        // Name, Keys, Events
        ['down', 'down', ['keyup']],
        ['up', 'up', ['keyup']],
        ['left', 'left', ['keyup']],
        ['right', 'right', ['keyup']],
        ['tab', 'tab', ['keyup', 'keydown']],
        ['enter', 'enter', ['keyup']],
        ['esc', 'esc', ['keyup']],
        ['remove', ['backspace', 'delete'], ['keyup', 'keydown']],
        ['letter', ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', '.', ',', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'W', 'Y', 'Z'], ['keyup', 'keydown']]
    ],
    
    /**
     * Initializes the keyboard bindings
     * @param {object} domNode [The DOM node of the element that should be bound]
     */
    setupKeyboardShortcuts: function (domNode) {
        var self = this;

        this.keyboardShortcuts.map(function (shortcut) {
            var shortcutName = shortcut[0],
                shortcutKey = shortcut[1],
                events = shortcut[2];

            events.map(event => {
                Mousetrap(domNode).bind(shortcutKey, function (e) {
                    self.publish(shortcutName + '_' + event, e, domNode.dataset.reactid);
                }, event);
            })
        });
    }
};

module.exports = dispatcher;