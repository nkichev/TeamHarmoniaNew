var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    /*function loadPostcards(){
        var postcards = [];
        window.everlive.data('Postcard').get().then(function(data){
            data.result.forEach(function(postcard){
                postcards.push({
                    title: postcard.Title
                });
            })
            return postcards;
        });
    };*/
    
    
    
    /*scope.postcards = function(e){
        var vm = kendo.observable({
            postcards: loadPostcards()
        });
        kendo.bind(e.view.element, vm);
    };  */  
}(app.viewmodels));