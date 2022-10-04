const renderCountries = countries => {
    let outputHtml = '';

    for(let i in countries) {
        let country = countries[i];
        
        let languagesStr = country.languages.map(el => el.name).join(', ');

        outputHtml += `<tr><td>${(+i + 1)}</td>
            <td>${country.name || '---'} </td>
            <td>${country.capital || '---'}</td>
            <td>${country.population || '---'}</td>
            <td>${country.region || '---'}</td>
            <td>${country.area || '---'}</td>
            <td>${languagesStr || '---'}</td>
            <td><img width="70px" src="${country.flagsStr}" ></td> </tr>`;
    }
    if(!countries.length){
        outputHtml += `<tr><td align='center' colspan='9'>Не найдено</td></tr>`;
    }

    $('#countries-tbody').html(outputHtml);
}

const sortCountries = countries => countries.sort((countryA, countryB) => countryB.population - countryA.population);

const logCountries = countries => {console.log(countries.length)};

var countries = [];

$('.actions-container > button').on('click touch', () => {
    $.ajax('https://restcountries.com/v2/all').then(date => {
        countries = date.map(country => ({
            name: country.name,
            capital: country.capital,
            population: country.population,
            area: country.area,
            region: country.region,
            flagsStr: country.flag,
            languages: country.languages,
        }));
        logCountries(countries);
        renderCountries(sortCountries(countries));
    })
});
//XMLHttpRequest code
   /*  var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            countries = JSON.parse(xhr.response);
            countries = countries.map(country => ({
                    name: country.name,
                    capital: country.capital,
                    population: country.population,
                    area: country.area,
                    region: country.region,
                    flagsStr: country.flag,
                    languages: country.languages,
                }));
            logCountries(countries);
            renderCountries(sortCountries(countries));

            document.querySelector('table.table tbody').onclick = e => {
                console.log(e.target.innerText);
            }
        }
    }

    xhr.open('GET', 'https://restcountries.com/v2/all', true);
    xhr.send('');
});
 */

$('.actions-container input').on('keyup', e => {
    let searchText = e.target.value;
    searchText = searchText.toLowerCase();
    let filteredCountries = countries.filter(country => {
        let countryName = country.name.toLowerCase();
        let countryRegion = country.region.toLowerCase();
        return countryName.indexOf(searchText) !== -1 || countryRegion.indexOf(searchText) !== -1 ;
    });
    renderCountries(filteredCountries);
});