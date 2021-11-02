import './sass/main.scss';

const debounce = require('lodash.debounce');

import fetchCountries from './js/fetchCountries';
import countryCard from './templates/country.hbs';
import countriesCard from './templates/countries.hbs';
import { alert } from '../node_modules/@pnotify/core';

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
    const input = e.target.value.trim();
    clearMarkup();
    if(input != ""){
    fetchCountries(input)
        .then((country) => renderCountryCard(country))
        .catch((error) => {alert(error)})
}}
function renderCountryCard(country) {
    if (country.length === 1) {
        renderCountry(...country)
    }
    else if (country.length > 10) {
        alert({ 
            text: "Too many matches found. Please enter more specific query!",
            type: 'notice',
            closer: true,
            sticker: false,
            width: '360px',
            styling: 'brighttheme',
  });
    }
    else if (country.length > 1  && country.length < 10) {
        renderCountries(country);
    }
     else { throw "Сountry does not exist"; }
}
function clearMarkup() {
    refs.cardContainer.innerHTML = "";
}