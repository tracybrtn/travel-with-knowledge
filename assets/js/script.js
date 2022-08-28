

//API Call to get country code
var getCountryCode = async (country) => {
    var url =`https://restcountries.com/v3.1/name/${country}`;
    var response = await fetch(url);
    var codeData = await response.json();
    console.log(codeData);

    if (codeData.length > 0) {
        var code = codeData[0].cca2;
        var retCountry = codeData[0].name.common
        console.log(code);
        console.log(retCountry); //Trying to log to localStorage
        getCountryData(code);
        storeCountry(retCountry);      
    } else {
        alert('Please enter a valid city and state');  
    }
}

//API call to get country advisory data
var getCountryData = async (code) => {
    url=`https://www.travel-advisory.info/api?countrycode=${code}`;
    var response = await fetch(url);
    var countryData = await response.json();
    console.log(countryData);
    
    if (countryData.data) {     
        var retData = countryData.data[code]; //created ability for variable within API returned data (i.e. AU)
        console.log(retData.advisory)  
        document.querySelector('.level').textContent = retData.advisory.message
        document.querySelector('.link').textContent = retData.advisory.source
        document.querySelector('.score').textContent = retData.advisory.score        
    } 
}

//Store Function To Hold Returned Country
var storeCountry = (retCountry) => {
    var storage = []
    storage.push(retCountry)
    localStorage.setItem('countryHistory', JSON.stringify(storage))
    }

//Get Stored Country (countryHistory)








//JS add event listener to button
document.getElementById("searchBtn").addEventListener("click", function () {
    var country = document.getElementById('inputCountry').value;
    if (country === '') {
        alert('Must search for Country')
        return
    }
    console.log(country);
    getCountryCode(country);
    //storeCountry(retCounty);
});