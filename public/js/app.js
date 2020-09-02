const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#weatherForm input');

const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`)
        .then(response => {
            return response.json();
        }).then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            }
            else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
            }
        });
})