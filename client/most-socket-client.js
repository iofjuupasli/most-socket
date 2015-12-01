(function (root, factory) {
    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['socket.io-client', 'most'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('socket.io-client'), require('most'));
    } else {
        root.mostSocketClient = factory(root.io, root.most);
    }
}(this, function (io, most) {
    function input(path, event) {
        return most.create(function (add) {
            var socket = io(path);
            socket.on(event, add);
            return function () {
                socket.disconnect();
            };
        });
    }

    function output(path, event) {
        return function (stream) {
            var socket = io(path);
            return stream.forEach(function (v) {
                socket.emit(event, v);
            }).then(function () {
                socket.disconnect();
            });
        };
    }

    return {
        input: input,
        output: output
    };
}));
