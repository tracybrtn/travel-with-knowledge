
//API Call to get country code
var getCountryCode = async (country) => {
    var url =`https://restcountries.com/v3.1/name/${country}`;
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);

    if (data.length > 0) {
        var code = data[0].cca2;
        var retCountry = data[0].name.common
        console.log(code);
        console.log(retCountry); //Trying to log to localStorage
        getCountryData(code);        
    } else {
        alert('Please enter a valid country');  
    }
}

//API call to get country advisory data
var getCountryData = async (code) => {
    url=`https://www.travel-advisory.info/api?countrycode=${code}`;
    var response = await fetch(url);
    var data = await response.json();
        
    if (data) {     
        var retData = data.data[code]; //created ability for variable within API returned data (i.e. AU)
        console.log(retData.advisory)  
        document.querySelector('.level').textContent = retData.advisory.message
        document.querySelector('.link').textContent = retData.advisory.source  
        console.log(retData.advisory.message)
        console.log(retData.advisory.source)       
        //document.querySelector('.score').textContent = retData.advisory.score              
    } 
    var score = retData.advisory.score  //Provide Status level and Code
        console.log(score);
        if (score >= 4)  {
            document.querySelector('.score').textContent = "Level 4",
            document.querySelector('.score').style.color = "red";
        }
        else if (score >= 3) {
            document.querySelector('.score').textContent = "Level 3",
            document.querySelector('.score').style.color = "orange";
        }
        else if (score >= 2) {
            document.querySelector('.score').textContent = "Level 2",
            document.querySelector('.score').style.color ="yellow";
        }
        else {
            document.querySelector('.score').textContent = "Level 1"
            document.querySelector('.score').style.color = "blue";
        } 
    }         

//Get Stored Country (countryHistory)
var storedCountry = document.getElementById('storedCountry')
var getHistory = () => {
    var storage = JSON.parse(localStorage.getItem('countryHistory'))
    storedCountry.textContent = ''
    if (storage === null) {
        storedCountry.textContent = 'Previous Searched Countries'
        return
    }
 
    for(var i = 0; i < storage.length; i++) {
        var historyBtn = document.createElement('button')
        historyBtn.textContent = storage[i]
        historyBtn.classList.add('history-btn')
        storedCountry.append(historyBtn)

        historyBtn.addEventListener('click', (e) => {
            getCountryCode(e.target.textContent)
        })
    }
}
        
 getHistory()

//Store Function To Hold Returned Country
var storeCountry = (country) => {
    var storage = JSON.parse(localStorage.getItem('countryHistory'))
    if (storage === null) {
        storage = []
    }

    storage.push(country)
    localStorage.setItem('countryHistory', JSON.stringify(storage))
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
    storeCountry(country);
});


