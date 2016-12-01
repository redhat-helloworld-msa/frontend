/**
 * JBoss, Home of Professional Open Source Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the
 * 
 * @authors tag. See the copyright.txt in the distribution for a full listing of individual contributors.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
var services = {};
var keycloak = Keycloak();

keycloak.init().success(function(authenticated) {
    console.log('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
    $('#login-status').text(keycloak.authenticated ? 'Authenticated as [' + keycloak.idTokenParsed.name +']' : 'Not Authenticated');
    if (authenticated){
        $('#show-logout-link').show();
    }else{
        $('#show-login-link').show();
    }
    sso_query();
}).error(function() {
    alert('Keycloak initialization error');
});

function invoke_secured_ajax(url, id) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json, text/plain, */*');
    req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                $('#' + id).text(req.responseText);
            } else {
                $('#' + id).text('Unauthorized');
                console.log('Error accessing ' + url + 
                    ' - Cause: ' + req.statusText);
            }
        }
    };

    req.send();
}

function load_data(){
    //Clear all responses
    for (service in services) {
        if (service.endsWith('-service')){
            $('#' + service + '-secured').text("Loading...");
        }
    }
    //Make the invocation
    for (service in services) {
        if (service.endsWith('-service')){
            invoke_secured_ajax(services[service].url + '-secured', service + '-secured');
        }
    }
}

function sso_query() {
    keycloak.updateToken(30).success(function() {
        load_data();
    }).error(function() {
        // Load the data anyway to show the error
        load_data();
        console.log('Failed to refresh token');
    });
};

