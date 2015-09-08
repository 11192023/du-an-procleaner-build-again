$(function() {

    $("input,textarea").jqBootstrapValidation({
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
        },
    });
});
