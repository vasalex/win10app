(function () {
    "use strict";

     var cities = [
          { group: { title: "neareast", ru: "Ближайшие" }, data: { id: 4368, name: "Москва" }, add_plus: { display: "none" }, type: "largeListIconTextItem", map: { display: "none" } },
          { group: { title: "neareast", ru: "Ближайшие" }, data: { id: 0, name: "" }, add_plus: { display: "none" }, type: "largeListIconTextItem", map: { display: "block" } },
          { group: { title: "saved", ru: "Сохранённые" }, data: { id: 4355, name: "Нижний Новгород" }, add_plus: { display: "none" }, type: "largeListIconTextItem", map: { display: "none" } },
          { group: { title: "saved", ru: "Сохранённые" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "largeListIconTextItem", map: { display: "none" } },
          { group: { title: "saved", ru: "Сохранённые" }, data: { id: 0, name: "" }, add_plus: { display: "block" }, type: "largeListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } },
          { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" }, type: "middleListIconTextItem", map: { display: "none" } }

      ];

      var citiesList = new WinJS.Binding.List(cities);

      function getGroupKey(dataItem) {
          return dataItem.group.title;
      }
      function getGroupData(dataItem) {
          return {
              title: dataItem.group.ru
          };
      }
      function compareGroup(dataItem) {
          return 0;
      }
      var groupedCitiesList = citiesList.createGrouped(getGroupKey, getGroupData, compareGroup);

      var groupInfo = function groupInfo() {
          return {
              enableCellSpanning: true,
              cellWidth: 250,
              cellHeight: 80
          };
      };
      WinJS.Utilities.markSupportedForProcessing(groupInfo);

      var itemInfo = WinJS.Utilities.markSupportedForProcessing(function itemInfo(itemIndex) {
          var size = { width: 250, height: 70 };
          var item = groupedCitiesList.getAt(itemIndex);
          if (item) {
              switch (item.type) {
                  case "smallListIconTextItem":
                      size = { width: 250, height: 70 };
                      break;
                  case "middleListIconTextItem":
                      size = { width: 250, height: 125 };
                      break;
                  case "largeListIconTextItem":
                      size = { width: 250, height: 250 };
                      break;
                  default:
              }
          }
          return size;
      });

      function oniteminvokedHandler(eventObject) {
          eventObject.detail.itemPromise.done(function (invokedItem) {
              WinJS.Navigation.navigate("/pages/weather/weather.html", invokedItem.data.data);
          });
         // WinJS.Navigation.navigate("/pages/weather/weather.html", eventObject);
      }

      WinJS.Namespace.define(
          "cities",
          {
              list: cities,
              groupedCitiesList: groupedCitiesList,
              groupInfo: groupInfo,
              itemInfo: itemInfo,
              oniteminvokedHandler: WinJS.UI.eventHandler(oniteminvokedHandler)
          });



    WinJS.UI.Pages.define("/pages/location/location.html", {
        ready: function (element, options) {
         }
    });

})();