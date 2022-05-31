// search history

var formEl = document.querySelector("#saveCity"); 
var tasksToDoEl = document.querySelector("#history"); 

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='search']").value;

  if (taskNameInput === "") {
    return false; 
  }

  formEl.reset();
  document.querySelector("input[name='search']").value = "";

  var taskDataObj = {
    name: taskNameInput
  };

  createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  var taskInfoEl = document.createElement("button");
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>";
  listItemEl.appendChild(taskInfoEl);

  console.dir(listItemEl);
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);

// weather search

document.querySelector('button').addEventListener('click',handleClick);

function handleClick() {
    let city = document.querySelector('input').value;
    if(!city)   return;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(url)
        .then(data=>data.json())
        .then(data=>{
            const {lat, lon} = data[0];

    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;



        fetch(url2)
            .then(data=>data.json())
            .then(({current, daily})=>{
                console.log(current, daily);

                let cTemp = current.temp;
                let cDate = moment().format('llll');
                let cHumidity = current.humidity;
                let uvi = current.uvi;
                let cWind = current.wind_speed;
                
                document.getElementById("current").innerHTML = 
                ` 
                <h2>${city} ${new Date(cDate).toLocaleDateString()}</h2>
                <h6>Temp: ${cTemp}</h6>
                <h6>Wind: ${cWind}</h6>
                <h6>Humidity: ${cHumidity}</h6>
                <h6>UV Index: <span>${uvi}</span></h6>
                `;

                document.getElementById("forecast").innerHTML =""

                for (let i = 0; i < 5; i++) {
                    
                    let dDate = daily[i].dt;
                    let dTemp = daily[i].temp.day;
                    let dHumidity = daily[i].humidity;
                    let dWind = daily[i].wind_speed;
                    
                    document.getElementById("forecast").innerHTML += 
                    `
                    <h4>${new Date(dDate * 1000).toLocaleDateString()}</h4>
                    
                    <h6>Temp: ${dTemp}</h6>
                    <h6>Wind: ${dWind}</h6>
                    <h6>Humidity: ${dHumidity}</h6>
                    `
                }

        })
    })
}

