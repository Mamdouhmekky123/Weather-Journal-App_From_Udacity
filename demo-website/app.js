// High performance
setTimeout(() => {
    document.querySelector("body").style.opacity = '1';
}, 400);

// Create a new date instance dynamically with JS
let d = new Date();
let original_month = d.getMonth() + 1;
let newDate = original_month + '.' + d.getDate() + '.' + d.getFullYear();
// we can use also ---->  const newDate = d.toDateString(); ---> to reptesent the date
console.log(newDate);

const zip = document.querySelector("#zip"); // related to input of type (text) that the user should type the zip code in it
const Feelings = document.querySelector("#Feelings");// related to  textarea that the user should type his\her feelings in it
const generate_Weather_Data = document.querySelector("#generate_Weather_Data");// button the user click on it
const Current_Temprature = document.querySelector("#Current_Temprature");//  Current Temprature to be displayed in a paragraph
const User_Feelings_output = document.querySelector("#User_Feelings_output");// User feelings to be displayed in a paragraph


// with the help of (https://openweathermap.org/current#zip) 
//we can represent an example of how to manipulate and fetch the data

const API_call = 'https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}';

// I have removed (,{country code}) because it is as a default ( United State)

// we will need to use the Base URL  so,
const base_URL = "https://api.openweathermap.org/data/2.5/weather?zip="

// no I got my ow key from here ()

const my_key = "&appid=ae0ac77b13796f6f24f4fd60a665f912&units=imperial"; // &appid=   +   my key  + &units=imperial --> "From udacity rubic" -- > to show the temperature with fahrenheit

//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

/*Functionalities*/


// when we click on the buuton --------------> 

// I used (__if__) to avoid  ----> "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')"

generate_Weather_Data.addEventListener('click', (event) => {
    event.preventDefault() // A ccording to my understanding prevent the button from doing any default functionality

    const completed_URL = `${base_URL}${zip.value}${my_key}`; // example --> https://api.openweathermap.org/data/2.5/weather?zip=43221&appid=ae0ac77b13796f6f24f4fd60a665f912&units=imperial
    console.log(completed_URL);
    console.log("https://api.openweathermap.org/data/2.5/weather?zip=43221&appid=ae0ac77b13796f6f24f4fd60a665f912&units=imperial");
    if (!zip) {
        alert("Please Enter the zip code ");
    }
    else if (!Feelings) {
        alert("Please Enter Your feelings ");
    }
    else {
        getWeatherData(base_URL, zip, my_key)
            //  chain promises
            // CureData means  We will take specifc peices of information not all 

            .then((data) => {
                postData('/add', {
                    Current_Date: newDate,
                    Current_Temprature: data.main.temp,
                    User_Feelings_output: Feelings.value
                }).then(retrieveData());
            })
    }
}
);

// getWeatherData is an asyncrounous function that has three parameters (Base Url , zip caode and my key)

const getWeatherData = async (base_URL, zip, my_key) => {

    const res = await fetch(base_URL + zip.value + my_key)
    try {

        let data = await res.json();

        //  console.log(data.message)
        return data;

    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}



// Async POST
//send data from user to the server
const postData = async (url = '', data = {}) => {

    const data_content = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', // We post data comesfrom same or internal origin 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await data_content.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//Update UI Data
const retrieveData = async () => {
    const request = await fetch("/all");
    try {
        const retrieved_data = await request.json();
        document.getElementById("Current_Temprature").innerHTML = "The Tempreture : ( " + Math.round(retrieved_data.Current_Temprature) + ") F";
        document.getElementById("Current_Date").innerHTML = "The Date :( " + retrieved_data.Current_Date + " )";
        document.getElementById("User_Feelings_output").innerHTML = "Today I feel  :( " + retrieved_data.User_Feelings_output + " )";
        console.log(newDate);
    }
    catch (e) {
        console.log("error", e);
    }
};