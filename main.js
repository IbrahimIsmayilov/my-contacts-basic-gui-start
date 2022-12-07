// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

// Array 
let contactsArray = loadcontactsArray();
displayAll();

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displaycontactsArray();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'SearchByEmail') {
    findByEmail();
  }
}

// MENU FUNCTIONS
function displaycontactsArray() {
  displayAll();
}

function addContact() {
  let contactName = prompt("Enter New Contact Name:");
  let contactEmail = prompt("Enter New Contact Email:");
  let contactNumber = prompt("Enter New Contact Number:");
  let contactCountry = prompt("Enter New Contact Country");
  contactsArray.push(newContact(contactName, contactEmail, contactNumber, contactCountry));

  outputEl.innerHTML = `Task Added: ${contactName}`;
  alert("New Contact has been added");
  displayAll();
  saveContact();

}

function removeContact() {
  let index = +prompt("Enter the contact # to remove:");
  if (index >= 0 && index < contactsArray.length) {
    contactsArray.splice(index, 1);
    alert(`Contact # ${index} has been removed`);
    displayAll();
    saveContact();
  } else {
    alert("Invalid Contact #");
  }
}

function displayByName(event) {
  let nameSearch = prompt("Enter a Name to find Contact: ");
  let divStr = "";
  for (let i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].contactName.includes(nameSearch)) {
      divStr += `
   <div style= 'border: 1px solid grey'>
   <h1> ${contactsArray[i].contactName} </h1>
   <p> ${contactsArray[i].contactEmail} </p>
   <p> ${contactsArray[i].contactNumber} (${contactsArray[i].contactCountry})</p>
   </div>
   `
    }
  }
  outputEl.innerHTML = divStr;
}

function displayByCountry() {
  let countrySearch = prompt("Enter a Country to find Contact: ");
  let divStr = "";
  for (let i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].contactCountry.includes(countrySearch)) {
      divStr += `
   <div style='border: 1px solid grey'>
   <h1> ${contactsArray[i].contactName} </h1>
   <p> ${contactsArray[i].contactEmail} </p>
   <p> ${contactsArray[i].contactNumber} (${contactsArray[i].contactCountry})</p>
   </div>
   `
    }
  }
  outputEl.innerHTML = divStr;
}

function findByEmail(emailInput) {
  for (let i = 0; i < contactsArray.length; i++) {
    if (emailInput === contactsArray[i].contactEmail) {
      divStr += `
      <div style='border: 1px solid grey'>
      <h1> ${contactsArray[i].contactName} </h1>
      <p> ${contactsArray[i].contactEmail} </p>
      <p> ${contactsArray[i].contactNumber} (${contactsArray[i].contactCountry})</p>
      </div>
      `
     } else {
     }
    }
  }


//Helper Functions
function newContact(contactDescription, contactEmails, contactNumbers, contactCountries) {
  return {
    contactName: contactDescription,
    contactEmail: contactEmails,
    contactNumber: contactNumbers,
    contactCountry: contactCountries,
    completed: ''
  }
}

function getContactHTMLStr(inputInfo, i) {
  return `
   <div>
   <h2> ${i}: ${inputInfo.contactName} </h2>
   <p>${inputInfo.contactEmail}</p>
   <p>${inputInfo.contactNumber} (${inputInfo.contactCountry})
   </div>
   `;
}

function displayAll() {
  let outputStr = '';
  for (let i = 0; i < contactsArray.length; i++) {
    outputStr += getContactHTMLStr(contactsArray[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function saveContact() {
  localStorage.setItem('contactsArray', JSON.stringify(contactsArray));
}

function loadcontactsArray() {
  let contactsArrayStr = localStorage.getItem('contactsArray');
  return JSON.parse(contactsArrayStr) ?? [];
}

