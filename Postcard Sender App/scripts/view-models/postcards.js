var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {

    function loadPostcards(e) {
        var vm = kendo.observable({
            postcards: []
        });
        kendo.bind(e.view.element, vm);
        return window.everlive.data('Postcard')
            .get()
            .then(function (data) {
                data.result.forEach(function (postcard) {
                    $.ajax({
                        type: "GET",
                        url: 'http://api.everlive.com/v1/P7b0o35jcf7ft5Uk/Files/' + postcard.Pic,
                        contentType: "application/json"
                    }).then(function (picData) {
                        
                        vm.get("postcards").push({
                            imageSrc: picData.Result.Uri,
                            content: postcard.Content,
                            receiver: postcard.Receiver
                        });
                    })
                })
            });
    };
    scope.postCards = {
        show: loadPostcards
    };
}(app.viewmodels));