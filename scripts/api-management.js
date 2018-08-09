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

function invoke_ajax_userkey(url, id) {
    $.ajax({
        url : url + "?user_key=12345",
        cache : false,
        timeout: 5000,
        success : function(data) {
            $('#' + id).text(data);
        },
        error : function(error) {
            $('#' + id).text(error.statusText ? error.statusText : 'Unauthorized');
            console.log('Error accessing ' + url + 
                    ' - Cause: ' + error.statusText);
        }
    });
}

function load_data_threescale(){
    //Clear all responses
    for (service in services) {
        if (service.endsWith('-service')){
            $('#' + service + '-managed').text("Loading...");
        }
    }
    //Make the invocation
    for (service in services) {
        if (service.endsWith('-service')){
            var url = services[service].url;
            invoke_secured_ajax(url.slice(0, 7) + 'api-' + url.slice(7), service + '-managed');
            // invoke_ajax(services[service].url.replace('helloworld-msa', 'api'), service + '-managed');
        }
    }
}

function managed_query() {
    keycloak.updateToken(30).success(function() {
        load_data_threescale();
    }).error(function() {
        // Load the data anyway to show the error
        load_data_threescale();
        console.log('Failed to refresh token');
    });
};
