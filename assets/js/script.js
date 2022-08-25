var getCountry = async (country) => {
    url=`https://www.travel-advisory.info/api?countrycode=AU`;
    var response = await fetch(url);
    var countryData = await response.json();
    console.log(countryData);


    if (countryData.data) {        
        document.querySelector('.level').textContent = countryData.data.AU.advisory.message
        document.querySelector('.link').textContent = countryData.data.AU.advisory.source
        document.querySelector('.score').textContent = countryData.data.AU.advisory.score
        //document.querySelector('.link').textContent = data.au.advisory.source
    }
}

document.getElementById("searchBtn").addEventListener("click", function () {
    var country = document.getElementById('inputCountry').value;
    if (country === '') {
        alert('Must search for Country')
        return
    }
    console.log(country);
    getCountry(country);
});