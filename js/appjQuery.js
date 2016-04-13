/*
 * Business Review - Ajax & jQuery implementation
 */
(function() {
    'use strict';
    // this function gets called when someone requests
    // additional info by clicking on input
    function getAjaxData(event) {
        // when click event fires, get the file from the data folder
        // based on the ID clicked, its a .json file
        var filename = '../data/' + event.target.id + '.json';
        // getJSON jQuery function allows us to load JSON
        // encoded data directly from the server without having
        // to go into the details of the HTTP requests and responses

        // $.getJSON loads JSON-encoded data from the server
        // using a GET HTTP request, filename below is always
        // a url, a string containing the URL to which the request
        // is sent.
        // next is the data, a plain object or string that is sent
        // to the server with the request.
        // this relies on the structure of the JSON file.
        // Using this structure it loops through the requested data
        // and builds what?


        $.getJSON(filename, function(jsonObj) {
            var info = '';
            for (var prop in jsonObj) {
                if (prop === "Image") {
                    info += '<div class="backdrop-block backdrop-image-min-size">' +
                        '<div class="pickgradient"><img class="img-responsive" src="../images/' +
                        jsonObj[prop] + '"></div>';
                } else if (prop === "Name") {
                    info += '<div class="overlay-font overlay-font-backdrop"><h4>' + jsonObj[prop] + '</h4></div></div>';
                } else {
                    info += '<p class="info">' + prop + ': ' + jsonObj[prop] + '<p>';
                }
            }
            // generic iterator fcn can be used to iterate over
            // objects and arrays. with objects, the callback fcn
            // is passed key, value or prop, value in this case,
            // same thing.
            $.each(jsonObj, function(prop, value) {
                info += ('<p>' + prop + ': ' + value + '</p>');
            });
            // this is either a getter or setter, get
            // doesn't take any arguments, but the setter
            // sets the HTML contents of each element in the set
            // of matched elements, in this case description
            // info is a string of HTML to set as the
            // content of each matched element

            $('#description').html(info);
        });
    }
    // Register event handlers to get the additional
    // info if requested
    $('input').on('click', getAjaxData);
}());