const cont= document.getElementById("country-contain"); // cards are inserted here
fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((country)  => {
    country.forEach((countries)  => {

        const card = document.createElement("div");
        card.className = "countrycards";
        
        card.innerHTML =  `
           <h3>${countries.name}</h3>
           <img src="${countries.flags.svg}" alt=${countries.name} Flag">
           <P><strong>Capital:</strong> ${countries.capital || "N/A"}</P>
           <P><strong>Region:</strong> ${countries.region }</P>
           <P><strong>Country CODE:</strong> ${countries.alpha3Code }</P>
           <button onclick= "getWeather('${countries.capital}' , '${countries.name}')">  WEATHER </button>
        `;
        cont.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("error in fetching" , error);
    cont.innerHTML = "server or internet issue , pls try later";
  });

function getWeather(capital , countryName){
    if(!capital){
        alert("error! no data available");
        return;
    }
    const key = "0a67be433ab115fe40d52596a169c736"
    const WEATHERAPPAPI = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`;
    

    fetch(WEATHERAPPAPI)
      .then((response) => response.json())
      .then((data) => {
        if(data.cod== 200){
            alert("Weather in "  + capital + "\n " +  "Temperature: " + data.main.temp + "Degrees:  \n" + "Condition:"
                 + "Humidity:" + data.main.humidity + "%");
        }
      })
      .catch((error) => {
        console.log("error in weather data" , error);
        alert("coudn't fetch data");
      });
}  


  




