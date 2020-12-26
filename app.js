// DEFINE UI VARS----------------------------
const form = document.querySelector('#reminder-form');
const reminderList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-reminders');
const filter = document.querySelector('#filter');
const reminderInput = document.querySelector('#reminder')



// LOAD EVENT LISTENERS----------------------
loadEventListeners();

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getReminders);
  
  // add reminder event
  form.addEventListener('submit', addReminder);

  // remove task event
  reminderList.addEventListener('click', removeReminder);

  // clear reminders event
  clearBtn.addEventListener('click', clearReminders);

  // filter event
  filter.addEventListener('keyup', filterReminders);
}



// GET REMINDERS FROM LOCAL STORAGE-----------------------------
function getReminders() {
  let reminders;
  if(localStorage.getItem('reminders') === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem('reminders'));
  }

  // loop through stored tasks and add to ul
  reminders.forEach(function(reminder) {
    // create li element
    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    // create text node and append to the li
    li.appendChild(document.createTextNode(reminder));

    // create new link element
    const link = document.createElement('a');

    // add class to link
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append link to li
    li.appendChild(link);

    // append li to ul
    reminderList.appendChild(li);
  });
}




// ADD REMINDER------------------------------
function addReminder(e){

// prompt user to input a reminder
  if(reminderInput.value === '') {
  alert('Add a reminder');
}

// create li element
const li = document.createElement('li');

// add class
li.className = 'collection-item';

// create text node and append to the li
li.appendChild(document.createTextNode(reminderInput.value));

// create new link element
const link = document.createElement('a');

// add class to link
link.className = 'delete-item secondary-content';

// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';

// append link to li
li.appendChild(link);

// append li to ul
reminderList.appendChild(li);

// store reminders in local storage
reminderToLocalStorage(reminderInput.value);

// clear input
reminderInput.value = ''


// console.log(li);
  e.preventDefault();
}



// STORE REMINDER TO LOCAL STORAGE-----------
function reminderToLocalStorage(reminder) {
  let reminders;
  if(localStorage.getItem('reminders') === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem('reminders'));
  }

  reminders.push(reminder)

  localStorage.setItem('reminders', JSON.stringify(reminders));
}





// REMOVE REMINDER---------------------------
function removeReminder(e){

  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) 
    {e.target.parentElement.parentElement.remove();
    
    // remove from local storage
    removeReminderFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


// REMOVE REMINDER FROM LOCAL STORAGE
function removeReminderFromLocalStorage(reminderInput) {
  let reminders;
  if(localStorage.getItem('reminders') === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem('reminders'));
  }

  reminders.forEach(function(reminder, index){
    if(reminderInput.textContent === reminder){
      reminders.splice(index, 1);
    }
  });

  localStorage.setItem('reminders', JSON.stringify(reminders));
}



// CLEAR REMINDERS---------------------------
function clearReminders() {
  
  // 1st method
  // reminderList.innerHTML = '';
  
  // while loop method
  // https://jsperf.com/innerHTML-vs-removeChild
  while(reminderList.firstChild) {
    reminderList.removeChild(reminderList.firstChild);
  };
  
  // clear all reminders from local storage
  clearRemindersFromLocalStorage();
}


// CLEAR ALL REMINDERS FROM LOCAL STORAGE
function clearRemindersFromLocalStorage() {
  localStorage.clear();
}




// FILTER REMINDERS--------------------------
function filterReminders(e) {
  const text = e.target.value.toLowerCase();

  // using query selector all because it returns a node list that can be looped
  document.querySelectorAll('.collection-item').forEach(function(reminder) {
    const item = reminder.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      reminder.style.display = 'block';
    } else { 
      reminder.style.display = 'none';
    }
  });
}



