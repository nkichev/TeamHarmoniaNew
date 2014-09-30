(function () {

    window.everlive = new Everlive("P7b0o35jcf7ft5Uk");
    var isOnlineEventCreated = false;

    document.addEventListener("offline", function () {
        navigator.notification.vibrate(1000);
        navigator.notification.alert('No internet connection available.');
        if (!isOnlineEventCreated) {
            document.addEventListener("online", function () {
                isOnlineEventCreated = true;
                navigator.notification.vibrate(1000);
                navigator.notification.alert('You are back online.');
            }, false)
        }
    }, false);

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();


        mobileApp = new kendo.mobile.Application(document.body, {
            transition: 'slide',
            skin: 'flat',
            initial: 'views/usersManagement.html'
        });
    }, false);

    function onClickLogout() {
        window.localStorage.clear();
    }
}());