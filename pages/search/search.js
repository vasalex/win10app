(function () {
    "use strict";

    function getData(query, callback) {
        if (query.length > 1) {
            var p = new RemoteData().getData("http://ed947b27.services.gismeteo.ru/inform-service/f6430fd320dfe3e8913ac72ef343509d/cities/?startsWith=" + query);
            p.done(
                function complete(result) {
                    var obj = result.response.items;
                    for (var i = 0; i < obj.length; i++) {
                        data.locations.push(obj[i]);
                    }
                    data.locations = data.locations.createSorted(function (f, s) {
                        return f.country_code.localeCompare(s.country_code);
                    });
                    data.list.forceLayout();
                   /* for (var i = 0; i < groupedLocations.groups.length; i++) {
                        var group = groupedLocations.groups.getItem(i);
                        for (var j = 0; j < group.groupSize; j++) {
                            var item = groupedLocations.getItem(group.firstItemIndexHint + j);
                            console.log([i, item.data.kind, item.data.name]);
                        }
                    }*/
                },
                function error(result) {
                    console.log(result.statusText);
                }
            );
        }
    }

    var p = 0;

    function getGroupKey(dataItem) {
        return dataItem.kind;
    }
    function getGroupData(dataItem) {
        var title = "Пункты";
        switch (dataItem.kind) {
            case "A":
                title = "Аэропорты";
                break;
            case "M":
                title = "Метеостанции";
                break;
            case "C":
                title = "Столицы";
                break;
            case "F":
                title = "Метеофон";
                break;
            case "T":
                title = "Пункты";
                break;
            default:
        }
        return {
            title: title
        };
    }
    function compareGroup(dataItem) {
        return 0;
    }

    function itemInfo() {
        return WinJS.Utilities.markSupportedForProcessing(function itemInfo(itemIndex) {
            var size = { width: 250, height: 70 };
            var item = data.locations.getAt(itemIndex);
            if (item) {
                switch (item.kind) {
                    case "A":
                    case "M":
                    case "F":
                        size = { width: 250, height: 70 };
                        break;
                    case "T":
                        size = { width: 250, height: 110 };
                        break;
                    case "C":
                        size = { width: 250, height: 250 };
                        break;
                    default:
                }
            }
            return size;
        });
    }

    function oniteminvokedHandler(eventObject) {
        WinJS.Navigation.navigate("/pages/weather/weather.html", eventObject);
    }

    WinJS.Namespace.define(
     "data",
     {
         locations: null,
         list: null,
         getData: getData,
         itemInfo: itemInfo(),
         oniteminvokedHandler: WinJS.UI.eventHandler(oniteminvokedHandler),
     });

    WinJS.UI.Pages.define("/pages/search/search.html", {
        init: function (element, options) {
        },
        ready: function (element, options) {
            data.locations = new WinJS.Binding.List().createGrouped(getGroupKey, getGroupData, compareGroup);
            data.itemInfo()
            data.list = element.querySelector("#cities").winControl;
            data.list.itemDataSource = data.locations.dataSource;
            data.list.groupDataSource = data.locations.groups.dataSource;
            data.getData(options.detail.queryText);
            data.list.layout.itemInfo = data.itemInfo;
            data.list.oniteminvoked = data.oniteminvokedHandler;
            WinJS.UI.processAll();
        }
    });

    var RemoteData = (function () {
        function RemoteData() { }
        RemoteData.prototype.getData = function (url, data) {
            return WinJS.xhr({
                url: url,
                type: 'GET',
                responseType: "json",
                data: JSON.stringify(data)
            });
        };
        return RemoteData;
    })();
})();