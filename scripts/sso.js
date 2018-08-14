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
var keycloak = Keycloak();

keycloak.init().success(function(authenticated) {
    console.log('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
    $('#login-status, #login-status-apimanagement').text(keycloak.authenticated ? 'Authenticated as [' + keycloak.idTokenParsed.name +']' : 'Not Authenticated');
    if (authenticated){
        $('#show-logout-link, #show-logout-link-apimanagement').show();
    }else{
        $('#show-login-link, #show-login-link-apimanagement').show();
    }
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
                if (req.status == 429) {
                    $('#' + id).text(req.statusText);
                } else {
                    $('#' + id).text('Unauthorized');
                    console.log('Error accessing ' + url + 
                        ' - Cause: ' + req.statusText);
                }
            }
        }
    };

    req.send();
}