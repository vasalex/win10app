﻿// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // поиск
            function suggestionsrequestedHandler(eventObject) {
                if (typeof cities != 'undefined') {
                    if (cities.list.length > 0 && eventObject.detail.queryText.length>0) {
                        var suggestionCollection = eventObject.detail.searchSuggestionCollection;
                        for (var i = 0; i < cities.groupedCitiesList.length; i++)
                            if (cities.list[i].group.title == "last_found")
                                suggestionCollection.appendQuerySuggestion(cities.list[i].data.name);
                    }
                }
            }

            function querySubmittedHandler(eventObject) {
                nav.navigate("/pages/search/search.html", eventObject);
            }
            WinJS.Namespace.define("Search", {
                querySubmittedHandler: WinJS.UI.eventHandler(querySubmittedHandler),
                suggestionsrequestedHandler: WinJS.UI.eventHandler(suggestionsrequestedHandler),
            });

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
