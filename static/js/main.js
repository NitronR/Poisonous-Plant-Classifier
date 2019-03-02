let plantInfos = {
    'lilies': "While they're most popular around Easter, lilies in the Hemerocallis genus endanger cats even after spring. That includes common tiger and daylily varieties. Eating just a small amount can lead to acute kidney failure or death.",
    'rhubarb': "The garden vegetable's stems do make for delicious pies. Just don't try using leaves. Eating too much will shut down the kidneys, occasionally proving fatal.",
    'oleander': 'Eating only a small part of this plant (which flowers in white, pink, or red) can be fatal. In one case, just one leaf was enough to harm a child. Symptoms of poisoning include drowsiness, slowed heart rate, and shaking.',
    'castor_oil_plant': 'Castor oil plays a part in many home remedies, but the actual plant itself is more likely to kill you than cure you. The seeds contain one of the most poisonous naturally occuring substances known to man, according to Cornell University College of Agriculture and Life Sciences. Just one seed can kill a child, as the toxic protein ricin can cause severe dehydration from vomiting and diarrhea.',
    'dieffenbachia': 'Also known as dumb cane and elephant ear can become deadly if ingested, causing the airways to swell shut. Even brushing against it can cause burning or itching.',
    'foxglove': "Don't let the pretty colors fool you. These bell-shaped blooms and their berries entice kids, but contain a compound used for treating heart failure. Eating them is like \"taking an unregulated dose of heart medicine,\" according to Poison Control.",
    'wisteria': 'Thankfully this climbing vine rarely harms humans, but the seed pods are toxic to dogs, cats, and horses. Head to the vet if you develop symptoms like vomiting or diarrhea.',
    'lily_of_the_valley': 'Breaking Bad fans will remember that Walter White used this sweet-looking plant for some not-so-sweet deeds. Consuming its toxic compounds — called cardiac glycosides — can send people to the hospital with symptoms like dizziness, vomiting, rashes, and diarrhea. If left untreated, those little bells can even cause death.'
}

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
                    $('#result').append('<br/><b>Description:</b>  ' + plantInfos[data.result]);
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