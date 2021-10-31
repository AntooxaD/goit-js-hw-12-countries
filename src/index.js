import './sass/main.scss';

const debounce = require('lodash.debounce');

import fetchCountries from './js/fetchCountries';
import countryCard from './templates/country.hbs';
import countriesCard from './templates/countries.hbs';

const refs = {
    input: document.querySelector('#country-search-input'),
    cardContainer: document.querySelector('.js-countries-container')
}

refs.input.addEventListener('input', debounce(onInput, 500),);

function renderCountry(country) {
    const markup = countryCard(country);
    refs.cardContainer.innerHTML = markup;
}
function renderCountries(country) {
     const markup = countriesCard(country);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function onInput(e) {
    const input = e.target.value;
    clearMarkup();
    if(input){
    fetchCountries(input)
        .then(renderCountryCard)
        .catch(error => {alert('here is no such country')})
}}
function renderCountryCard(country) {
    if (country.length === 1) {
        renderCountry(...country)
    }
    else (country.length > 1 && country.length <=10)
    {
        renderCountries(country);
    }

}
function clearMarkup() {
    refs.cardContainer.innerHTML = "";
}