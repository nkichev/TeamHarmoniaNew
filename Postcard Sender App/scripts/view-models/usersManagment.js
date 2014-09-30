var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {

    scope.usersManagement = kendo.observable({
        register: function () {
            var username = this.get('registerUsername');
            var fullName = this.get('registerFullName');
            var password = this.get('registerPassword');

            window.everlive.Users.register(username, password,
                {
                    DisplayName: fullName
                },
                function (data) {
                    navigator.notification.alert("You were successfully registered! Now you can login.");
                    $('#tb-register-username').val('');
                    $('#tb-register-fullName').val('');
                    $('#tb-register-password').val('');
                },
            function (error) {
                navigator.notification.alert(error.message);
            })
        },
        login: function () {
            var username = this.get('loginUsername');
            var password = this.get('loginPassword');

            window.everlive.Users.login(username, password,
                function (data) {
                    console.log(data);
                    window.localStorage.setItem('userAuthentication', data.result.access_token)
                    $('#tb-login-username').val('');
                    $('#tb-login-password').val('');
                    mobileApp.navigate('views/postcards.html');
                },
            function (error) {
                navigator.notification.alert(error.message);
            })

        }
    });
}(app.viewmodels));

