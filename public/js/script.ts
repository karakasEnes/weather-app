const formEl = document.querySelector('form') as HTMLFormElement;
const inputEl = document.querySelector('.search-input') as HTMLInputElement;

const fetchedContainer = document.querySelector(
  '.fetched-container'
) as HTMLElement;
const textSearch = document.querySelector(
  '.searched-location'
) as HTMLParagraphElement;
const textFullInfo = document.querySelector(
  '.full-info'
) as HTMLParagraphElement;

type TfetchedData = {
  searchedLocation: string;
  strToSend: string;
} & {
  errMessage: string;
};

formEl.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const value = inputEl.value;

  textSearch.innerHTML = 'Loading...';
  textFullInfo.innerHTML = '';

  const url = 'http://localhost:4444/weather?search=' + value;
  // const url = '/weather?search=' + value;
  inputEl.value = '';
  fetch(url)
    .then((res: Response) => res.json())
    .then((data: TfetchedData) => {
      if (data.errMessage) {
        textSearch.innerHTML = data.errMessage;
        return;
      }

      textSearch.innerHTML = data.searchedLocation;
      textFullInfo.innerHTML = data.strToSend;
    })
    .catch((_e: Error) => {
      textSearch.innerHTML = 'Error while Fetching...';
      textFullInfo.innerHTML = '';
    });
});
