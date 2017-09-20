const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

function addLi() {
    // create a list item:
    const ListItem = document.createElement('li');
    ListItem.textContent = input.value;

    // create and add label with checkbox to the list item:
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const labelInput = document.createElement('input');
    labelInput.type = 'checkbox';
    label.appendChild(labelInput);
    ListItem.appendChild(label);

    // create and add "edit" button:
    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'edit';
    ListItem.appendChild(editButton);

    // create and add "remove" button:
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'remove';
    ListItem.appendChild(removeButton);

    // Add the list item to the unordered list:
    ul.appendChild(ListItem);
}

form.addEventListener('submit', (e) => {
    // prevent from loading the page after when submitting:
    e.preventDefault();
    // add list Item and empty input form:
    addLi();
    input.value = '';
});

ul.addEventListener('click', (event) => {
    if (event.target.className === 'remove') {
        const li = event.target.parentNode;
        ul.removeChild(li);
    }
});
