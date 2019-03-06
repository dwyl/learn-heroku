// Client ID and API key from the Developer Console
      var CLIENT_ID = '929069745301-7c7p3kv04nnqlck4iommqbd94op1irkq.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCYjjoLglFHnxywR6QxPs7IDJQFfKFp0Xs';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

      var authorizeButton = document.getElementById('sign_in_btn');
      var signoutButton = document.getElementById('sign_out_btn');
      var menuBtn = document.getElementById('menu');
      var header = document.getElementById('fixed_header_area');
      var isLoggedIn = document.getElementsByClassName("isLoggedIn")[0];
      var isLoggedOut = document.getElementsByClassName("isLoggedOut")[0];
      

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.

          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          //handleAuthClick();

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          header.style.display = 'none';
          isLoggedIn.style.display = 'block';
          isLoggedOut.style.display = 'none';
          signoutButton.style.display = 'block';
          menuBtn.style.display = "block";
          listMajors();
        } else {
          authorizeButton.style.display = 'block';
          header.style.display = 'block';
          isLoggedIn.style.display = 'none';
          isLoggedOut.style.display = 'block';
          signoutButton.style.display = 'none';
          menuBtn.style.display = "none";
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */

      var lastRow;
      function appendPre(message, i) {
        var row;
        var pre = document.getElementById('results_section');
        row = pre.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.className = "result_object";
        cell.innerHTML = (message);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '15As92qSD9_6DEZC2nSdPtCqOSLFR4_KNiXWHC0JLY_E',
          range: 'A1:D',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              appendPre('<h1 class="company_name">'+row[0]+'</h1><p class="domain_name">'+row[1]+'</p><p class="contact_email">'+ row[2] +'</p><button class="current_state ' + (row[3].toLowerCase().replace(/ /g,"_")) + '">' + row[3] + '</button>', i);
            }
          } else {
            appendPre('No results...');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }

      function searchFunction() {
        // Declare variables 
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("results_section");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.childNodes[0].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          } 
        }
      }

      function toggleMenu() {
        var fx = document.getElementById('fixed_header_area');
        fx.style.display = (fx.style.display=="none") ? 'block':'none';
      }
