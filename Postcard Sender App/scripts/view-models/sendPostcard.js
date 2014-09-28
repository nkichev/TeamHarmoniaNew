var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    /* scope.sendPostcard = kendo.observable({
        title: '',
        save: function(ev){
            window.everlive.data('Postcard').create({
                Title: this.get('title')
            });
        }
    }); */

    scope.sendPostcard = kendo.observable({
        save: function () {
            var geocoder = new google.maps.Geocoder();
            var city;
            var state;
            var location = {};
            var content = this.get('content');
            var receiver = this.get('receiver');
            var picSuccess = function (data) {
                var id;
                window.everlive.Files.create({
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                        ContentType: "image/jpeg",
                        base64: data
                    },
                    function (picData) {
                        //getgeo
                        window.everlive.data('Postcard').create({
                            'Pic': picData.result.Id,
                            'Location': location,
                            'Content': content + ' ' + state + ': ' + city,
                            'Receiver': receiver
                        }, function (data) {
                            console.log(data);
                        }, error);
                    }, error);
            };
            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };
            var picConfig = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };

            var geoConfig = {
                enableHighAccuracy: true
            };
            var geoSuccess = function (data) {
                location = {
                    longitude: data.coords.longitude,
                    latitude: data.coords.latitude
                };

                var lat = parseFloat(data.coords.latitude);
                var lng = parseFloat(data.coords.longitude);

                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var arrAddress = results[0].address_components;
                            // iterate through address_component array
                            $.each(arrAddress, function (i, address_component) {
                                if (address_component.types[0] == "locality") {
                                    city = address_component.long_name;
                                    //console.log(address_component.long_name); // city
                                    alert(address_component.long_name);
                                    //return false; // break
                                }
                                if (address_component.types[0] == "administrative_area_level_1"){
                                    state = address_component.long_name;
                                    alert(state);
                                    //return false;
                                }
                            });
                        } else {
                            alert("No results found");
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                });

                navigator.camera.getPicture(picSuccess, error, picConfig);
            }

            navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
        }
    });


}(app.viewmodels));