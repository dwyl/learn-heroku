//Random Greeting
randomGreeting();
function randomGreeting() {
      var msg = document.getElementById('login_title');
      var randomMSG = ["Ahoi", "Hello", "Yo", "Hi", "Bonjour", "Hola", "Guten tag", "Ciao", "Ola", "Salaam", "Zdrasvuyte", "Konban wa", "Halo"];
      var min=0; 
      var max=randomMSG.length;  
      var random = Math.floor(
        Math.random() * (+max - +min)
      ) + +min;

      msg.innerText = randomMSG[random] + ",";
}


// Client ID and API key from the Developer Console
      var CLIENT_ID = '929069745301-7c7p3kv04nnqlck4iommqbd94op1irkq.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCYjjoLglFHnxywR6QxPs7IDJQFfKFp0Xs';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

      var onLoaded = document.getElementById('onLoaded');
      var progress = document.getElementsByClassName('bouncybox')[0];
      var authorizeButton = document.getElementById('sign_in_btn');
      var signoutButton = document.getElementById('sign_out_btn');
      var signedData = document.getElementById('signedData');
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
          onLoaded.style.display = "block";
          progress.style.display = "none";
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
          signedData.style.display= "block";
          listMajors();
        } else {
          authorizeButton.style.display = 'block';
          header.style.display = 'block';
          isLoggedIn.style.display = 'none';
          isLoggedOut.style.display = 'block';
          signoutButton.style.display = 'none';
          menuBtn.style.display = "none";
          signedData.style.display= "none";
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
        var pre = document.getElementById('results_section');
        pre.innerHTML = "";
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '15As92qSD9_6DEZC2nSdPtCqOSLFR4_KNiXWHC0JLY_E',
          range: 'A1:E',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              if(row.length) {
                appendPre('<input class="update_date" value="'+row[4]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="company_name" value="'+row[0]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="domain_name" value="'+row[1]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="contact_email" value="'+ row[2] +'" OnChange="updateRow(this.parentElement,' + i + ')"><br><input class="current_state ' + ((row[3].length) ? row[3].toLowerCase().replace(/ /g,"_"):"Undefined") + '" value="' + row[3] + '" OnChange="updateRow(this.parentElement,' + i + ')">', i);
              }
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
          td = tr[i].getElementsByTagName("td")[0]; //0 = Date; 1 = Company; 2 = Domain; 3 = Email; 4 = Status;
          if (td) {
            txtValue = td.childNodes[1].innerText;
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
        randomGreeting();
      }

      function toggleAddForm(obj) {
        var f = document.getElementById(obj);
        f.style.display = (f.style.display == "block") ? "none": "block";
      }

      function onAddSubmit(event) {
        event.preventDefault();

        var company = document.getElementById("company").value;
        var domain = document.getElementById("domain").value;
        var email = document.getElementById("email").value;
        var status = document.getElementById("status").value;
        var data = [company, domain, email, status, "=Now()"];
        writeRow(data);

      }

  function writeRow(data) {
      var values = [
          data
      ];
      var body = {
        values: values
      };
      gapi.client.sheets.spreadsheets.values.append({
         spreadsheetId: '15As92qSD9_6DEZC2nSdPtCqOSLFR4_KNiXWHC0JLY_E',
         range: "A1:E",
         valueInputOption: "USER_ENTERED",
         resource: body
      }).then((response) => {
        var result = response.result;
        location.reload();
      });
  }

  function updateRow(data, i) {
    console.log(i);
    data = [data.childNodes[1].value, data.childNodes[2].value, data.childNodes[3].value, data.childNodes[5].value, data.childNodes[0].value]
    var ranges = (("A" + (parseInt(i)+1)) + (":E" + (parseInt(i)+1)));
    console.log(ranges);
    var values = [
        data
    ];
    var body = {
      values: values
    };
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: '15As92qSD9_6DEZC2nSdPtCqOSLFR4_KNiXWHC0JLY_E',
       range: ranges,
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      listMajors();
    });
  }









