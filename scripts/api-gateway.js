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
var apiurl = '';

function api_gateway() {
    $.ajax({
        url : apiurl,
        cache : false,
        xhrFields : {
            withCredentials : true
        },
        success : function(data) {
            $('#api-gateway').empty();
            result = data;
            var str = '<ul>';
            for (var x = 0; x < result.length; x++) {
                str += '<li>' + result[x] + '</li>';
            }
            str += '</ul>';
            $('#api-gateway').append(str);
        },
        error : function(error) {
            $('#api-gateway').append('Error invoking api-gateway');
        }
    });
};

$(document).ready(function() {
    $.getJSON('services.json').done(function(json) {
        apiurl = json['api-gateway'].url;
        api_gateway();
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        alert("Request Failed: " + err)
    });

});
