
var searchLocations = []

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
        storeCountry(retCountry)     
    } else {
        alert('Please enter a valid country');  
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
    var score = retData.advisory.score
        console.log(score);  
}

//Get Stored Country (countryHistory)
var storedCountry = document.getElementById('storedCountry')
var getHistory = () => {
//    var storage = JSON.parse(localStorage.getItem())
//    storedCountry.textContent = ''
//    if (storage === null) {
//    storedCountry.textContent = 'Previous Searched Countries'
//      return
//   }

    

    for(var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        let location = JSON.parse(value)     
        //if (searchLocations.includes(location)) {      AUTOMATILY OCCURRING
           // return
        
        
        var historyBtn = document.createElement('button')
        historyBtn.textContent = location
        historyBtn.classList.add('history-btn')
        storedCountry.append(historyBtn)
        console.log(searchLocations)

        historyBtn.addEventListener('click', (e) => {
            getCountryCode(location)
            console.log(getCountryCode)
        })
    }

}
getHistory()

//Store Function To Hold Returned Country
var storeCountry = (retCountry) => {
    searchLocations.push(retCountry)
    localStorage.setItem(retCountry, JSON.stringify(retCountry))
    getHistory()
    }

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

if (localStorage.length > 0) {
    for(var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        let location = JSON.parse(value)
        searchLocations.push(location)
    }
}
