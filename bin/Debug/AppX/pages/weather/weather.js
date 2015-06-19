(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/weather/weather.html", {
        init: function (element, options) {
        },
        ready: function (element, options) {
            element.querySelector('.pagetitle').winControl.innerHTML(options.name);
            WinJS.UI.processAll();
        }
    });
})();