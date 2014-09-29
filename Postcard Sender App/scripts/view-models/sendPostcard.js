var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {

    scope.sendPostcard = kendo.observable({
        check: function () {
            var contactNameFilter = this.get('contactName');
            if (contactNameFilter != undefined) {
                var fields = [navigator.contacts.fieldType.emails];

                var options = new ContactFindOptions();
                options.filter = contactNameFilter;
                function onSuccess(contact) {
                    var contactEmail = contact[0].emails[0].value;

                    if (contactEmail) {
                        $('#tb-receiver').val(contactEmail);
                    } 
                }
                function onError() {
                    alert("No email for this contact. Please insert it manually or check your input!")
                }

                navigator.contacts.find(fields, onSuccess, onError, options);
            }
        },
        save: function () {
            //var isconnected = app.Connection.isConnected();
            if (app.Connection.isConnected()) {
                var geocoder = new google.maps.Geocoder();
                var city;
                var state;
                //var locationDetails = {};
                var location = {};
                var content = this.get('content');
                var receiver = this.get('receiver');
                if (receiver.indexOf('@') != -1) {
                    var picSuccess = function (data) {
                        var picId;
                        var picUri;
                        window.everlive.Files.create({
                            Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                            ContentType: "image/jpeg",
                            base64: data
                        }, function (picData) {
                            //getgeo
                            window.everlive.data('Postcard').create({
                                'Pic': picData.result.Id,
                                'Location': location,
                                'Content': content + ' from ' + city + ', ' + state,
                                'Receiver': receiver
                            }, function (data) {
                                app.helper.sendEmail(data, receiver);
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
                                            //console.log(address_component.long_name); // citys
                                            //return false; // break
                                        }
                                        if (address_component.types[0] == "administrative_area_level_1") {
                                            state = address_component.long_name;
                                            //return false;
                                        }
                                    });

                                    //return {
                                    //    city: city,
                                    //    state: state
                                    //};
                                } else {
                                    alert("No results found");
                                }
                            } else {
                                alert("Geocoder failed due to: " + status);
                            }
                        });
                        //locationDetails = app.Geocoder.GetLocationDetails(lat, lng);
                        navigator.camera.getPicture(picSuccess, error, picConfig);
                    }

                    navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
                }
                else {
                    alert('You must enter a correct email address ');
                }
            }
        }
    });


}(app.viewmodels));

