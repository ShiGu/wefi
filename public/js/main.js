  // Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    console.log('Running main.js');

    /* Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    */

    //Add User button click
    $('#btnAddProvider').on('click', addUser);

     // Delete User link click
    $('#providerList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
var populateTable = function () {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/userlist', function( data ) {

        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>'+ this.wifiname + '</td>';
            tableContent += '<td>' + this.wifipassword + '</td>';
            tableContent += '<td>' + this.message + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        console.log(tableContent);
        // Inject the whole content string into our existing HTML table
        $('#providerList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

       // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {

console.log('addUser function started');

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProvider input').each(function(index, val) {

        console.log($(this).val() + "errorCount = " + errorCount);
        if($(this).val() === '') { errorCount++;}
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addProvider fieldset input#inputProviderName').val(),
            'wifiname': $('#addProvider fieldset input#inputProviderWiFiname').val(),
            'wifipassword': $('#addProvider fieldset input#inputProviderWiFipassword').val(),
            'message' : $('#addProvider fieldset input#inputProviderMessage').val(),
            'location': $('#addProvider fieldset input#inputProviderLocation').val(),
            '_csrf': $('#addProvider fieldset input#csrf').val(),
        }

        console.log("errorCount= "+ errorCount+ "csrf token = " + newUser._csrf);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/addUser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs, except for the hidden _csrf value
                $('#addProvider fieldset input#inputProviderName').val('');
                $('#addProvider fieldset input#inputProviderWiFiname').val('');
                $('#addProvider fieldset input#inputProviderWiFipassword').val('');
                $('#addProvider fieldset input#inputProviderMessage').val('');
                $('#addProvider fieldset input#inputProviderLocation').val('');

                console.log("After clearing form inputs, _csrf = " + $('#addProvider fieldset input#csrf').val());

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

    	var token = {
    		'id' : $(this).attr('rel'),
    		'_csrf' : $('#deleteForm fieldset input#csrf').val()};

    	console.log(token);
        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: token,
            url: '/deleteuser/'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};


