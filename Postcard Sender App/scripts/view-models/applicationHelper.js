var app = app || {};
app.helper = app.helper || {};

(function (scope) {
    scope.sendEmail = function (data, receiver) {
        var picContent;
        window.everlive.data('Postcard')
                .getById(data.result.Id)
                .then(function (postcard) {
                    console.log(postcard);
                    picContent = postcard.result.Content;

                    return $.ajax({
                        type: "GET",
                        url: 'http://api.everlive.com/v1/P7b0o35jcf7ft5Uk/Files/' + postcard.result.Pic,
                        contentType: "application/json"
                    })
                }).then(function (picData) {
                    picUri = picData.Result.Uri;
                    console.log(picData.Result.Uri);

                    var attributes = {
                        "Recipients": receiver,
                        "PostCardUrl": picData.Result.Uri,
                        "Content": picContent
                    };
                    return $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/P7b0o35jcf7ft5Uk/functions/SendEMail',
                        contentType: "application/json",
                        data: JSON.stringify(attributes),

                        success: function (data) {
                            alert("Email successfully sent.");
                            $('#tb-receiver').val(' ');
                            $('#tb-content').val(' ');
                            $('#tb-contact').val(' ');
                        },
                        error: function (error) {
                            alert(JSON.stringify(error));
                        }
                    })
                })
    };
}(app.helper));