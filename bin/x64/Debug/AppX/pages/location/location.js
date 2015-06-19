(function () {
    "use strict";


    var cities = [
        { group: { title: "neareast", ru: "Ближайшие" }, data: { id: 4368, name: "Москва" }, add_plus: { display: "none" } },
        { group: { title: "neareast", ru: "Ближайшие" }, data: { id: 0, name: "" }, add_plus: { display: "none" } },
        { group: { title: "saved", ru: "Сохранённые" }, data: { id: 4355, name: "Нижний Новгород" }, add_plus: { display: "none" } },
        { group: { title: "saved", ru: "Сохранённые" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" } },
        { group: { title: "saved", ru: "Сохранённые" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" } },
        { group: { title: "saved", ru: "Сохранённые" }, data: { id:0, name: "" }, add_plus: { display: "block" } },
        { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" } },
        { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" } },
        { group: { title: "last_found", ru: "Последние поиски" }, data: { id: 4355, name: "Киров" }, add_plus: { display: "none" } }
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

    WinJS.Namespace.define("cities", { groupedCitiesList: groupedCitiesList });

})();