"use strict"

//Variables
var zipcode; 
var source;
var lists = {};
var elmt_list = $('#list');

$("#zip").blur(function(){

zipcode = $('#zip').val();
source = 'https://geo.api.gouv.fr/communes?codePostal='+zipcode+'&fields=nom&format=json&geometry=centre';

});


$(document).ready(function(){

    // ====================
    // Retrieve lists
    // ====================


    $("#zip").blur(function() {
        var $t = $(this);
        var $e = $("#erreur");
        if (!$t.val()) {
            $e.text("Le code postal est vide").show();
        } else {
            // Retrieve all playlists by AJAX
            $e.hide();
            setLists(source);   
        }
    }).blur();

    // $("#zip").on('blur', function(){
    //     // Retrieve all playlists by AJAX
    //     setLists(source);    
    // });

});

/**
 * SetLists
 * 
 * @param (string) url address of Lists 
 * @return (object) lists
 */
function setLists(url) 
{
    // AJAX request
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: show_list,
        error: function(){
            alert( "Oops an error has occurred." );
        }
    });
}


// La partie DOM LIST
function show_list(response) {

    elmt_list.empty();
    lists = response;
    
    $.each(lists, function (indexInArray, list) { 
        

        var elmt_option = $('<option>');
    
        elmt_option.attr("value", list.nom );
        elmt_option.text(list.nom);
        elmt_list.append(elmt_option); 
    
    });
    
}