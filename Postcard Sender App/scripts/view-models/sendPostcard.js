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
                                    'Pic' : picData.result.Id,
                                    'Location': location,
                                    'Content': content,
                                    'Receiver': receiver
                                }, function(data) {
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
                        enableHighAccuracy : true  
                    };
                    var geoSuccess = function(data){
                        location = {
                            longitude: data.coords.longitude,
                            latitude: data.coords.latitude
                        };
                        
                        navigator.camera.getPicture(picSuccess, error, picConfig);
                    }

                        navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
                    }
                });


        }(app.viewmodels));