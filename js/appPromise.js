'use strict';

function getDataFromServer(filename) {
    // this is an asynchronous function that creates
    // and returns a promise. it promises the caller
    // data that it will eventually get from the server.
    // filename denotes a JSON filename to get from the
    // server.
    var promise = new Promise(function(resolve, reject) {
        // create an XMLHttpRequest object
        var request = new XMLHttpRequest();
        // specify a GET request for the JSON file
        request.open('GET', filename);
        request.send();
        request.onreadystatechange = function() {
            // check that the response is complete
            if (request.readyState === 4)
            // if the request was successful
                if (request.status === 200) {
                // if the resolve function is invoked on success.
                // it is passed the content of the file as an
                // argument.
                resolve(request.responseText);
            } else {
                // the request failed
                // the reject function is invoked on failure
                // it is passed a string describing the failure
                var reason = filename + ': ' + request.status + '-' +
                    request.statusText;
                reject(reason);
            }
        };
    });
    // The function returns the promise
    return promise;
}

function displayInfo(jsonString) {
    // convert the JSON encoded string to object
    var jsonObj = JSON.parse(jsonString);
    // build a string from the properties and their values.
    var info = '';
    for (var prop in jsonObj) {
      if(prop === "Image") {
        info += '<div class="backdrop-block backdrop-image-min-size">' +
              '<div class="pickgradient"><img class="img-responsive" src="../images/' +
              jsonObj[prop] + '"></div>';
      } else if(prop === "Name"){
        info+= '<div class="overlay-font overlay-font-backdrop"><h4>' + jsonObj[prop] + '</h4></div></div>';
      } else {
        info += '<p class="info">' + prop + ': ' + jsonObj[prop] + '<p>';
      }
    }
    // display the additional info in the description html element
    document.getElementById('description').innerHTML = info;
}

function displayError(reason) {
    document.getElementById('description').textContent = reason;
}

function moreInfo(event) {
    // the requested filename is given by the input element id
    var filename = '../data/' + event.target.id + '.json';
    // the return value from the asynchronous function is a promise
    var promised = getDataFromServer(filename);
    // the caller specifies the success and failure functions
    promised.then(displayInfo).catch(displayError);
}
// Register an event handler to get the additional info if requested
document.getElementById('business').addEventListener('click', moreInfo, false);