$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                data = JSON.parse(data);

                if (data.prob > 0.8) {
                    $('#result').html('<b>Prediction:</b>  ' + formatName(data.result));
                    $('#result').append('<br/><b>Surity:</b>  ' + round(data.prob * 100) + '%');
                } else {
                    $('#result').text('Not sure what this is.');
                }
            },
            complete: function (xhr, status) {
                $('.loader').hide();
                $('#result').fadeIn(600);
                if (status == 'error') {
                    $('#result').text('Network error: Please ensure a strong internet connection.');
                }
            }
        })
    });

});

function round(val, places) {
    return Math.round(val * 100) / 100;
}

function formatName(string) {
    string = string.replace(/_/g, ' ');
    return string.charAt(0).toUpperCase() + string.slice(1);
}