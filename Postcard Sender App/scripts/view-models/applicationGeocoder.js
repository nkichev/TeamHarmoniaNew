//var app = app || {};
//app.Geocoder = app.Geocoder || {};

//(function (scope) {
//    scope.GetLocationDetails = function (lat, lng) {
//        var geocoder = new google.maps.Geocoder();
//        var city;
//        var state;

//        var latlng = new google.maps.LatLng(lat, lng);
//        geocoder.geocode({
//            'latLng': latlng
//        }, function (results, status) {
//            if (status == google.maps.GeocoderStatus.OK) {
//                if (results[0]) {
//                    var arrAddress = results[0].address_components;
//                    // iterate through address_component array
//                    $.each(arrAddress, function (i, address_component) {
//                        if (address_component.types[0] == "locality") {
//                            city = address_component.long_name;
//                            //console.log(address_component.long_name); // city
//                            alert(address_component.long_name);
//                            //return false; // break
//                        }
//                        if (address_component.types[0] == "administrative_area_level_1") {
//                            state = address_component.long_name;
//                            alert(state);
//                            //return false;
//                        }
//                    });

//                    //return {
//                    //    city: city,
//                    //    state: state
//                    //};
//                } else {
//                    alert("No results found");
//                }
//            } else {
//                alert("Geocoder failed due to: " + status);
//            }
//        });
//    }
//}(app.Geocoder));