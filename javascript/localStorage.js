// This code sets up a form on a webpage and allows users to store their data in local storage
const contactForm = document.getElementById('contact-form');
const {
name: nameInput,
email: emailInput,
message: messageInput,
} = contactForm.elements;

// This function checks if the specified type of storage is available and returns a boolean value
// It tries to set an item in storage and remove it, and returns true if successful
// If an error is thrown, it returns false
function storageAvailable(type) {
let storage;
try {
storage = window[type];
const x = 'storage_test';
storage.setItem(x, x);
storage.removeItem(x);
return true;
} catch (e) {
return (
e instanceof DOMException
&& (
e.code === 22
|| e.code === 1014
|| e.name === 'QuotaExceededError'
|| e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
&& storage
&& storage.length !== 0
);
}
}

// This variable checks whether local storage is available and assigns it to availableStorage
let availableStorage;

if (storageAvailable('localStorage')) {
// If local storage is available, use it
availableStorage = window.localStorage;
} else {
// If local storage is not available, set availableStorage to null
availableStorage = null;
}

// This object stores the form data
const formData = {};

// This function stores the form data in JSON format in local storage
function storeData() {
formData.name = nameInput.value;
formData.email = emailInput.value;
formData.message = messageInput.value;
const jsonData = JSON.stringify(formData);
availableStorage.setItem('contactFormData', jsonData);
}

// These event listeners call the storeData() function when the input fields change
nameInput.addEventListener('change', () => {
storeData();
});

emailInput.addEventListener('change', () => {
storeData();
});

messageInput.addEventListener('change', () => {
storeData();
});

// This function retrieves the form data from local storage and populates the form fields with it
function retrieveData() {
const data = availableStorage.getItem('contactFormData');
const parseData = JSON.parse(data);
if (data?.length > 0) {
const { name, email, message } = parseData;
nameInput.value = name || '';
emailInput.value = email || '';
messageInput.value = message || '';
}
}

// This event listener calls the retrieveData() function when the window loads
window.onload = () => {
retrieveData();
};

// This event listener resets the form and clears the local storage when the reset button is clicked
const btnReset = document.getElementById('btn-reset');

btnReset.addEventListener('click', (event) => {
event.preventDefault();
contactForm.reset();
availableStorage.clear();
});
