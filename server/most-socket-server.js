var most = require('most');

module.exports = function (io) {
    function input(ns, event) {
        return most.create(function (add) {
            io.of(ns).on('connection', function (socket) {
                socket.on(event, add);
            });
        });
    }

    function output(ns, event) {
        return function (stream) {
            return stream.forEach(function (v) {
                io.of(ns).emit(event, v);
            });
        };
    }

    return {
        input: input,
        output: output
    };
};
