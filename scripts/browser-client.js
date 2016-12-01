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

function invoke_ajax(url, id) {
    $.ajax({
        url : url,
        cache : false,
        timeout: 5000,
        success : function(data) {
            $('#' + id).text(data);
        },
        error : function(error) {
            $('#' + id).text(id + ' (fallback)');
            console.log('Error accessing ' + url + 
                    ' - Cause: ' + error.statusText);
        }
    });
}

function browser_query() {
    //Clear all responses
    for (service in services) {
        $('#' + service).text("Loading...");
    }
    //Make the invocation
    for (service in services) {
        invoke_ajax(services[service].url, service)
    }
};

$(document).ready(function() {
    $.getJSON('services.json').done(function(json) {
        services = json;
        browser_query();
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        alert("Request Failed: " + err)
    });
});
