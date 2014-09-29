(function () {

    window.everlive = new Everlive("P7b0o35jcf7ft5Uk");

    document.addEventListener("offline", function () {
        navigator.notification.vibrate(1000);
        alert('no connection');
    }, false);

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();


        var app = new kendo.mobile.Application(document.body, {

            transition: 'slide',
            skin: 'flat',
            initial: 'views/postcards.html'
        });


    }, false);

}());