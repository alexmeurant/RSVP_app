const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

// Loads list Items when DOM is ready:
document.addEventListener("DOMContentLoaded", () => {
    const loadData = localStorage.getItem("listItems");
    ul.innerHTML = loadData;
});

// Saves list Items:
function saveData() {
    const listItems = ul.innerHTML;
    localStorage.setItem("listItems", listItems);
}

// creates a filter div:
const main = document.querySelector('.main');
const filterDiv = document.createElement('div');
const filterLabel = document.createElement('label');
filterLabel.textContent = 'Hide invitees who do not confirm';
const filterInput = document.createElement('input');
filterInput.type = 'checkbox';
filterLabel.appendChild(filterInput);
filterDiv.appendChild(filterLabel);
main.insertBefore(filterDiv, ul);

// Selects list items with no confirmation:
function listItemNotConfirmed(value) {
    const listItems = ul.children;
    for (let i = 0; i < listItems.length; i++) {
        const input = listItems[i].querySelector('input');
        if (!input.checked) {
            listItems[i].style.display = value;
            // Local storage of the list items:
            saveData();
        }
    }
}

// Hides, if checked, list Items which invitees have not confirmed:
filterInput.addEventListener('change', () => {
    if (filterInput.checked) {
        listItemNotConfirmed('none');
    } else {
        listItemNotConfirmed('');
    }
});

function addLi() {
    // create a list item:
    const ListItem = document.createElement('li');
    // create span and add input text inside:
    const span = document.createElement('span');
    span.textContent = input.value;
    ListItem.appendChild(span);

    // create and add label with checkbox to the list item:
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const labelInput = document.createElement('input');
    labelInput.type = 'checkbox';
    label.appendChild(labelInput);
    ListItem.appendChild(label);

    // create and add "edit" button:
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    ListItem.appendChild(editButton);

    // create and add "remove" button:
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    ListItem.appendChild(removeButton);

    // Add the list item to the unordered list:
    ul.appendChild(ListItem);
}

form.addEventListener('submit', (e) => {
    // prevents from loading the page when submitting:
    e.preventDefault();
    // adds list Item and empty input form:
    addLi();
    // Local storage of the list items:
    saveData();
    // Resets form input value:
    input.value = '';
});

ul.addEventListener('click', (event) => {
    const li = event.target.parentNode;
    const span = li.querySelector('span');
    const listItemInput = document.createElement('input');
    listItemInput.type = 'text';

    if (event.target.textContent === 'remove') {
        ul.removeChild(li);
        // Local storage of the list items:
        saveData();

    } else if (event.target.textContent === 'edit') {
        const label = li.querySelector('label');
        li.insertBefore(listItemInput, label);
        listItemInput.value = span.textContent;
        li.removeChild(span);
        event.target.textContent = 'save';

    } else if (event.target.textContent === 'save') {
        const newSpan = document.createElement('span');
        const listItemInput = li.querySelector('input');
        li.insertBefore(newSpan, listItemInput);
        newSpan.textContent = listItemInput.value;
        li.removeChild(listItemInput);
        event.target.textContent = 'edit';
        // Local storage of the list items:
        saveData();
    }
});
