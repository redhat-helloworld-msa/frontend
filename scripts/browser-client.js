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

var env = {};

var services = [ {
    'url' : '/api/hola',
    'id' : 'hola-service',
    'port': 'HOLA_PORT'
}, {
    'url' : '/api/bonjour',
    'id' : 'bonjour-service',
    'port': 'BONJOUR_PORT'
}, {
    'url' : '/api/hello',
    'id' : 'hello-service',
    'port': 'HELLO_PORT'
}, {
    'url' : '/api/aloha',
    'id' : 'aloha-service',
    'port': 'ALOHA_PORT'
}, {
    'url' : '/api/ola',
    'id' : 'ola-service',
    'port': 'OLA_PORT'
}, {
    'url' : '/api/namaste',
    'id' : 'namaste-service',
    'port': 'NAMASTE_PORT'
}, ];


function invoke_ajax(url, id) {
    $.ajax({
        url : url,
        cache : false,
        success : function(data) {
            $('#' + id).text(data);
        },
        error : function(error) {
            $('#' + id).text('Error getting value from service ' + url);
        }
    });
}

function browser_query() {
    //Clear all responses
    for (var x = 0; x < services.length; x++) {
        $('#' + services[x].id).text("Loading...");
    }
    //Make the invocation
    for (var x = 0; x < services.length; x++) {
				invoke_ajax('http://' + env["HOSTIP"] + ':' + env[services[x].port] + services[x].url, services[x].id)
}
};

$(document).ready(function() {
    $.ajax({
        url: document.URL + 'env',
        success: function (result) {
            env = result.env;
        },
        async: false
    });


    browser_query();
});
