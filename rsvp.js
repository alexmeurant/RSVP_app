const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

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
    // prevent from loading the page when submitting:
    e.preventDefault();
    // add list Item and empty input form:
    addLi();
    input.value = '';
});

ul.addEventListener('click', (event) => {
    const li = event.target.parentNode;
    const span = li.querySelector('span');
    const input = document.createElement('input');
    input.type = 'text';
    const inputTargeted = span.querySelector('input');

    if (event.target.textContent === 'remove') {
        ul.removeChild(li);
    } else if (event.target.textContent === 'edit') {
        span.appendChild(input);
        event.target.textContent = 'save';
    } else if (event.target.textContent === 'save') {
        if (inputTargeted.value !== '') {
            span.textContent = inputTargeted.value;
        } else {
            span.removeChild(inputTargeted);
        }
        event.target.textContent = 'edit';
    }
});
