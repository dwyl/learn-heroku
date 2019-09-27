const API_KEY = 'AIzaSyDMbhCmhzrIsKXoGrxbqOTRzdoYiwxllag'
const CLIENT_ID = '4137827372-07nd717u8ecpq74eetr5l2sidd3649nv.apps.googleusercontent.com'
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
const SCOPES = "https://www.googleapis.com/auth/spreadsheets"

const firebaseConfig = {
  apiKey: "AIzaSyDMbhCmhzrIsKXoGrxbqOTRzdoYiwxllag",
  authDomain: "tape-deck-static.firebaseapp.com",
  databaseURL: "https://tape-deck-static.firebaseio.com",
  projectId: "tape-deck-static",
  storageBucket: "",
  messagingSenderId: "4137827372",
  appId: "1:4137827372:web:d10f937295dd3a4a506589"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

let googleUser, isSignedIn

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope(SCOPES)

const handleClientLoad = () => {
  gapi.load('client:auth2', initClient)
}

const initClient = () => {
  //listMajors()
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(() => {
    googleUser = gapi.auth2.getAuthInstance().currentUser.get()
    isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get() 
    if (isSignedIn) {
      // get the credentials from the google auth response
      const idToken = googleUser.getAuthResponse().id_token
      const creds = firebase.auth.GoogleAuthProvider.credential(idToken)
      // auth in the user 
      firebase.auth().signInWithCredential(creds).then((user) => {
         // you can use (user) or googleProfile to setup the user
         const googleProfile = googleUser.getBasicProfile()
         if (user) {
            // do something with this user
            listMajors()
         }
      })
   }
  })
}

//Declare elements of interest
const loading = document.getElementsByClassName('bouncybox')[0]
const loginWindow = document.getElementById('login_window')
const userContent = document.getElementById('user_content')

document.getElementById('sign_in_btn').addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken
      const user = result.user
    }).catch(function(error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
    })
})

document.getElementById('sign_out_btn').addEventListener('click', () => {
  console.log("Log out")
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  })
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    verifyUser(user)
    const displayName = user.displayName
    const email = user.email
    const emailVerified = user.emailVerified
    const photoURL = user.photoURL
    const isAnonymous = user.isAnonymous
    const uid = user.uid
    const providerData = user.providerData
    loading.style.display = 'none'
    loginWindow.style.display = 'none'
    userContent.style.display = 'block'
  } else {
    loading.style.display = 'none'
    userContent.style.display = 'none'
    loginWindow.style.display = 'block'
  }
})

const verifyUser = user => {
  db.collection("users").doc(user.uid).set({
    email: user.email
  })
  .then(function(docRef) {
      console.log("Document written with ID:")
  })
  .catch(function(error) {
      console.error("Error adding document: ", error)
  })
}

//Random Greeting
const randomGreeting = () => {
  const msg = document.getElementById('login_title')
  const randomMSG = [
    "Ahoi", 
    "Hello", 
    "Yo", 
    "Hi", 
    "Bonjour", 
    "Hola", 
    "Guten tag", 
    "Ciao", 
    "Ola", 
    "Salaam", 
    "Zdrasvuyte", 
    "Konban wa", 
    "Halo"
  ]
  const min = 0
  const max = randomMSG.length
  const random = Math.floor(
    Math.random() * (+max - +min)
  ) + +min

  msg.innerText = randomMSG[random] + ","
}

const getCookie = name => {
  const value = "; " + document.cookie
  const parts = value.split("; " + name + "=")
  if (parts.length == 2) return parts.pop().split(";").shift()
}

const onLoaded = document.getElementById('onLoaded')
const authorizeButton = document.getElementById('sign_in_btn')
const signedData = document.getElementById('signedData')
const menuBtn = document.getElementById('menu')
const header = document.getElementById('fixed_header_area')
const isLoggedIn = document.getElementsByClassName("isLoggedIn")[0]
const isLoggedOut = document.getElementsByClassName("isLoggedOut")[0]
         
const appendPre = (message, i) => {
  const pre = document.getElementById('results_section')
  const row = pre.insertRow(-1)
  const cell = row.insertCell(-1)
  cell.className = "result_object"
  cell.innerHTML = (message)
  cell.addEventListener('focusin', (event) => {
    canUpdate = false
    document.getElementById("disable_updates").style.display = "block"  
  })
  cell.addEventListener('focusout', (event) => {
    canUpdate = true
    document.getElementById("disable_updates").style.display = "none"
  })
}

const listMajors = () => {
  let companyList = []
  const pre = document.getElementById('results_section')
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1Ak_zvY5HqoeODZJO7goJBVDxU4uFkHeS6NKsYmuztk8',
    range: 'sheet1',
  }).then(function(response) {
    const range = response.result
    if (range.values && range.values.length > 0) {
      for (i = 1; i < range.values.length; i++) {
        const row = range.values[i]
        if(row.length && !companyList.includes( row[0] )) {
          appendPre('<input class="update_date" value="'+row[4]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="company_name" value="'+row[0]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="domain_name" value="'+row[1]+'" OnChange="updateRow(this.parentElement,' + i + ')"><input class="contact_email" value="'+ row[2] +'" OnChange="updateRow(this.parentElement,' + i + ')"><br><input class="current_state ' + ((row[3].length) ? row[3].toLowerCase().replace(/ /g,"_"):"Undefined") + '" value="' + row[3] + '" OnChange="updateRow(this.parentElement,' + i + ')">', i)
          companyList.push( row[0] )
        }
      }
    } else {
      appendPre('No results...')
    }
    }, function(response) {
      gapi.auth2.getAuthInstance().signIn()
      appendPre('Error: ' + response.result.error.message)
    })
}

const searchFunction = () => {
  let input, filter, table, tr, td, i, txtValue
  input = document.getElementById("search")
  filter = input.value.toUpperCase()
  table = document.getElementById("results_section")
  tr = table.getElementsByTagName("tr")

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0] //0 = Date; 1 = Company; 2 = Domain; 3 = Email; 4 = Status;
    if (td) {
      txtValue = td.childNodes[1].value
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ""
      } else {
        tr[i].style.display = "none"
      }
    } 
  }
}

const toggleMenu = () => {
  const fx = document.getElementById('fixed_header_area')
  fx.style.display = (fx.style.display=="none") ? 'block':'none'
  randomGreeting()
}

const toggleAddForm = obj => {
  const f = document.getElementById(obj)
  f.style.display = (f.style.display == "block") ? "none": "block"
}

const onAddSubmit = e => {
  e.preventDefault()
  const company = document.getElementById("company").value
  const domain = document.getElementById("domain").value
  const email = document.getElementById("email").value
  const status = document.getElementById("status").value
  const data = [company, domain, email, status, "=Now()"]
  writeRow(data)
}

const onEditSubmit = e => {
  e.preventDefault()
  const sheetId = document.getElementById("current_sheet_display").value
  document.cookie = `sheetID=${sheetId}`
}

const writeRow = data => {
  const values = [ data ]
  const body = { values: values }
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: '1Ak_zvY5HqoeODZJO7goJBVDxU4uFkHeS6NKsYmuztk8',
    range: "A1:E",
    valueInputOption: "USER_ENTERED",
    resource: body
  }).then((response) => {
    location.reload()
  })
}

const updateRow = (data, i) => {
  data = [data.childNodes[1].value, data.childNodes[2].value, data.childNodes[3].value, data.childNodes[5].value, data.childNodes[0].value]
  const ranges = (("A" + (parseInt(i)+1)) + (":E" + (parseInt(i)+1)))
  const values = [
    data
  ]
  const body = {
    values: values
  }
  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: '1Ak_zvY5HqoeODZJO7goJBVDxU4uFkHeS6NKsYmuztk8',
    range: ranges,
    valueInputOption: "USER_ENTERED",
    resource: body
  }).then((response) => {
    const result = response.result
    listMajors()
  })
}

//https://www.w3schools.com/howto/howto_js_sort_table.asp
const sortTable = (sortIndex, filter) => {
  //Handle input
  const indexFilter = ["date", "name", "domain", "email", "skip", "status"]
  let newIndex = indexFilter.indexOf(sortIndex) //Tells us which item to sort
  // Declare variables 
  let table, tr, td, i, txtValue
  filter = filter.toUpperCase()
  table = document.getElementById("results_section")
  tr = table.getElementsByTagName("tr")

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0] //0 = Date; 1 = Company; 2 = Domain; 3 = Email; 4 = Status;
    if (td) {
      txtValue = td.childNodes[newIndex].value
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ""
      }else {
        tr[i].style.display = "none"
      }
    } 
  }
}








