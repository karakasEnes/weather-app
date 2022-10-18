const formEl = document.querySelector('form');
const inputEl = document.querySelector('.search-input');

const fetchedContainer = document.querySelector('.fetched-container');
const textSearch = document.querySelector('.searched-location');
const textFullInfo = document.querySelector('.full-info');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = inputEl.value;

  textSearch.innerHTML = 'Loading...';
  textFullInfo.innerHTML = '';

  const url = 'http://localhost:4000/weather?search=' + value;
  inputEl.value = '';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.errMessage) {
        textSearch.innerHTML = data.errMessage;

        return;
      }

      textSearch.innerHTML = data.searchedLocation;
      textFullInfo.innerHTML = data.strToSend;
    })
    .catch((e) => {
      textSearch.innerHTML = 'Error while Fetching...';
      textFullInfo.innerHTML = '';
    });
});
