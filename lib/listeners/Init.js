/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
var EVENT_NAME = 'init';
var initialised = false;
function run(emitter) {
    function notify() {
        emitter.emit(EVENT_NAME, {});
    }
    if (initialised) {
        notify();
    }
    else {
        cuAPI.OnInitialized(function () {
            initialised = true;
            notify();
        });
    }
}
var InitListener = (function () {
    function InitListener() {
        this.once = true;
    }
    InitListener.prototype.start = function (emitter) {
        // for the init listener, we always want to run it
        // because it may be called post-init, in which case
        // it needs to fire the handler immediately
        run(emitter);
    };
    return InitListener;
})();
exports.__esModule = true;
exports["default"] = InitListener;
