/**
 * Global menu messages controller
 */
App.Models.Messages = function() {
    function getLatestMessage() {
        return 'Zeus Scaffolding';
    }

    return {
        getLatestMessage: getLatestMessage
    }
};