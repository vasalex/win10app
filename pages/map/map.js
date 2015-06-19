(function () {
    "use strict";
    function initialize() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: new google.maps.LatLng(55.749, 37.632)
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})();