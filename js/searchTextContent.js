const inputSearch = document.getElementById('inputSearch');
const buttonSearch = document.getElementById('buttonSearch');
const textContentList = [...document.querySelectorAll('.js-text-content')];
const searchResultSpace = document.getElementById('searchResultSpace');
const amountResult = document.getElementById('amountResult');

(function() {
    if (inputSearch) {
        inputSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        buttonSearch.addEventListener('click', () => {
            handleSearch();
        });
    }
})();

(function() {
    if (searchResultSpace) {
        const searchResult = JSON.parse(window.localStorage.getItem('searchResult'));
        searchResult.length ? insertResult(searchResult) : clearResultSpace();
    }
})();

function handleSearch() {
    const result = searchValue(
        textContentList.map(item => item.textContent.trim().replace(/\s+/g," ")),
        inputSearch.value
    );

    window.localStorage.setItem('searchResult', JSON.stringify(result));
    window.location.href = 'pages/busca.html';
}

function insertResult(searchResult) {
    const stringHtmlResult = searchResult.map(item => ('<span class="text">' + item + '</span>')).join('');
    const stringHtmlAmount = searchResult.length + ' resultados encontrados'

    searchResultSpace.innerHTML = stringHtmlResult;
    amountResult.innerHTML = stringHtmlAmount;
}

function clearResultSpace() {
    searchResultSpace.innerHTML = '<span class="text"> Nenhum resultado encontrado. </span>';
    amountResult.innerHTML = '0 resultados encontrados';
}

function searchValue(listValues, inputSearchValue) {
    return listValues.filter(textValue => textValue.includes(inputSearchValue));
}