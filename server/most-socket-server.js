var most = require('most');

module.exports = function (io) {
    function input(room, event) {
        return most.create(function (add) {
            io.of(room).on(event, add);
            return function () {
                io.of(room).removeListener(event, add);
            };
        });
    }

    function output(room, event) {
        return function (stream) {
            return stream.forEach(function (v) {
                io.of(room).emit(event, v);
            });
        };
    }

    return {
        input: input,
        output: output
    };
};
