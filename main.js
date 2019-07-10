/**
 * Name: Nadir Tareen
 * Date: May 31, 2019
 * Section: CSE 154 AJ
 * This is the JS to implement the UI for my website.
 */

(function() {
  "use strict";

  /** represents the api url needed to fetch movies */
  const URL_1 = "https://api.themoviedb.org/3/movie/";

  /** represents my api key */
  const URL_2 = "?api_key=2004de3bc7eac4331419b4afcd84ee4f&language=en-US";

  /** represents the base url for my api */
  const GAME_URL = "game.php";

  /** represents the base url for the travel api */
  const TRAVEL_URL = "travel.php";

  /** an array of funny movie ids for the movie api */
  const MOVIE_ID_FUNNY = [10189, 496, 195589, 8363, 12153, 64688, 120467, 6957, 115, 55721];

  /** an array of sci-fi movie ids for the movie api */
  const MOVIE_ID_SCIFI = [157336, 27205, 329865, 603, 62, 286217, 218, 1272, 782, 264660];

  /** an array of crime movie ids for the movie api */
  const MOVIE_ID_CRIME = [769, 240, 111, 500, 680, 275, 1422, 103, 6977, 949];

  /** represents the id of statements returned from my api */
  let gameId = null;

  window.addEventListener("load", init);





  /** initializes event handlers for UI elements on the page */
  function init() {

    let buttons = document.querySelectorAll('.open');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", expand);
    }
    let snowbutton = document.getElementById("snowbutton");
    let movieButton = document.getElementById("moviebutton");
    let truthButton = id("truthbutton");
    id("submit").addEventListener("click", submit);
    snowbutton.addEventListener("click", show);
    movieButton.addEventListener("click", fetchMovie);
    truthButton.addEventListener("click", getStatements);
    id("all").addEventListener("click", checkFilter);
    id("visited").addEventListener("click", checkFilter);
    id("novisit").addEventListener("click", checkFilter);
    getTable("all");
  }

  /** expands the UI drop down elements on the website */
  function expand() {
      let sec = this.parentElement.parentElement;
      let elements = sec.children;
      if (this.className === "open") {
        for (let i = 1; i < elements.length; i++) {
          elements[i].classList.remove("hidden");
        }
        this.className = "close";
      } else {
        for (let i = 1; i < elements.length; i++) {
          elements[i].classList.add("hidden");
        }
        this.className = "open";
      }
  }

  /** adds an image element to the DOM */
  function show() {
    let img = document.getElementById("snow");
    if (img) {
      let cap = this.parentElement.getElementsByClassName('caption');
      this.parentElement.removeChild(img);
      this.parentElement.removeChild(cap[0]);
    } else {
      img = document.createElement("img");
      img.src = "images/snow leopard (2).jpg";
      img.id = "snow";
      let cap = document.createElement("p");
      cap.className = "caption";
      cap.innerText = "A photo of a Snow Leopard I took at an animal sanctuary in the Northern Are";
      cap.innerText += "as of Pakistan";
      this.parentElement.appendChild(img);
      this.parentElement.appendChild(cap);
    }
  }

  /** Attempts to fetch movie data from the API */
  function fetchMovie() {
    let genre = qs("input[name='genre']:checked").value;
    let id = 0;
    let index = Math.floor(Math.random() * 10);
    if (genre === "crime") {
      id = MOVIE_ID_CRIME[index];
    } else if (genre === "comedy") {
      id = MOVIE_ID_FUNNY[index];
    } else if (genre === "scifi") {
      id = MOVIE_ID_SCIFI[index];
    } else {
      let type = Math.floor(Math.random() * 3);
      if (type === 0) {
        id = MOVIE_ID_CRIME[index];
      } else if (type === 1) {
        id = MOVIE_ID_FUNNY[index];
      } else {
        id = MOVIE_ID_SCIFI[index];
      }
    }
    let url = URL_1 + id + URL_2;
    fetch(url)
    .then(checkStatus)
    .then(JSON.parse)
    .then(loadMovie)
    .catch(handleRequestError);
  }

 /**
  * loads the movie data from the json file retrieved from API
  * @param {JSON} movieJson - Json object representing movie data
  */
  function loadMovie(movieJson) {
    let d = id("movie");
    while (d.firstChild) {
      d.removeChild(d.firstChild);
    }
    let p = document.createElement("p");
    p.innerText = "Movie: ";
    d.appendChild(p);
    let i = document.createElement("img");
    let path = "" + movieJson["poster_path"];
    i.src = "https://image.tmdb.org/t/p/w500" + path;
    i.alt = "" + movieJson.title + " poster";
    d.appendChild(i);
    let u = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");
    let li5 = document.createElement("li");
    let o = document.createElement("p");
    li1.innerText = "Title: " + movieJson.title;
    li2.innerText = "Release Date: " + movieJson["release_date"];
    li3.innerText = "Popularity: " + movieJson.popularity;
    li4.innerText = "Rating: " + movieJson["vote_average"];
    li5.innerText = "Runtime: " + movieJson.runtime + " min";
    o.innerText = "Overview: " + movieJson.overview;
    u.appendChild(li1);
    u.appendChild(li2);
    u.appendChild(li3);
    u.appendChild(li4);
    u.appendChild(li5);
    d.appendChild(u);
    d.appendChild(o);
  }


 /** Gives the user and error message when fetch request cannot be made */
  function handleRequestError() {
    if (id("error")) {
      let error = id("error");
      error.parentElement.removeChild(error);
    }
    let message = document.createElement("p");
    message.innerText = "Sorry I can't find my movies right now :/";
    message.id = "error";
    id("moviegen").appendChild(message);
  }

 /**
  * Checks status of the fetch request
  * @param {promise} response - Promise object representing status of the request
  * @return {string} string representing the status of the fetch request
  */
  function checkStatus(response) {
     if (response.status >= 200 && response.status < 300 || response.status == 0) {
       return response.text();
     } else {
       return Promise.reject(new Error(response.status + ": " + response.statusText));
     }
   }

  /** sends a fetch request for the 2T1L game statements */
  function getStatements() {
   let url = GAME_URL + "?type=statement";
   fetch(url)
   .then(checkStatus)
   .then(JSON.parse)
   .then(addStatements)
   .catch(handleRequestError);
  }

 /**
  * adds statements below the generate button for the user to guess
  * @param {JSON} json - json with the statements for the game
  */
  function addStatements(json) {
   let statements = json.statements.split(",");
   let ans = json.answer;
   gameId = json.id;
   let container = id("options");
   while (container.firstChild) {
     container.removeChild(container.firstChild);
   }
   for (let i = 0; i < statements.length; i++) {
     let button = document.createElement("button");
     button.innerText = statements[i];
     if (statements[i] === ans) {
       button.id = "answer";
     }
     button.addEventListener("click", checkAnswer);
     container.appendChild(button);
     id("comment").innerText = "";
   }
  }

  /** checks to see if the users answer is correct */
  function checkAnswer() {
   let comment = "";
   if (this.id === "answer") {
     comment += "CORRECT! ";
   } else {
     comment += "INCORRECT! ";
   }
   let container = id("comment");
   container.innerText = comment;
   getComment();
  }

  /** sends a fetch request to the game api for the comment for the current set of statements */
  function getComment() {
   let url = GAME_URL + "?type=comment&value=" + gameId;
   fetch(url)
   .then(checkStatus)
   .then(addComment)
   .catch(handleRequestError);
  }

  /** implements functionality for travel log filters */
  function checkFilter() {
    let filter = this.id;
    getTable(filter);
  }

 /**
  * loads the travel log table with the given filter
  * @param {string} filter - represents the current filter applied on the table
  */
  function getTable(filter) {
    let url = TRAVEL_URL + "?filter=" + filter;
    fetch(url)
    .then(checkStatus)
    .then(JSON.parse)
    .then(addTable)
    .catch(handleRequestError);
  }

 /**
  * loads the travel log table with the given filter
  * @param {JSON} travelJson - represents a JSON file with the current state of the travel table
  */
  function addTable(travelJson) {
    let table = qs("table");
    let length = travelJson.length;
    let rows = qsa("tr");
    let currLength = rows.length;
    for (let i = 1; i < currLength; i++) {
      table.removeChild(rows[i]);
    }
    for (let i = 0; i < length; i++) {
      let row = document.createElement("tr");
      let place = document.createElement("th");
      let country = document.createElement("th");
      let visited = document.createElement("th");
      let date = document.createElement("th");
      let interests = document.createElement("th");
      console.log(travelJson[i].place);
      place.innerText = travelJson[i].place;
      country.innerText = travelJson[i].country;
      if (travelJson[i].visited === "0") {
        visited.innerText = "No";
      } else {
        visited.innerText = "Yes";
      }
      date.innerText = travelJson[i].date;
      interests.innerText = travelJson[i].interests;
      row.appendChild(place);
      row.appendChild(country);
      row.appendChild(visited);
      row.appendChild(date);
      row.appendChild(interests);
      table.appendChild(row);
    }
  }

  /** implements the submit functionality for the travelog */
  function submit() {
    let url = TRAVEL_URL;
    let fields = qsa("#add input");
    let place = fields[0].value;
    let country = fields[1].value;
    let interests = qs("textarea").value;
    if (place && country && interests) {
      let params = new FormData();
      params.append("place", place);
      params.append("country", country);
      params.append("interests", interests);
      fetch(url, {method: "POST", body: params})
      .then(checkStatus)
      .catch(console.error);
    }
    getTable("all");
  }

 /**
  * adds the comment for the current statements
  * @param {string} text - comment for the current statements
  */
  function addComment(text) {
   let comment = text;
   id("comment").innerText += " " + comment;
  }

  /**
  * Returns the element that has the ID attribute with the specified value.
  * @param {string} idName - element ID
  * @returns {object} DOM object associated with id.
  */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
  * Returns the first element that matches the given CSS selector.
  * @param {string} selector - CSS query selector.
  * @returns {object} The first DOM object matching the query.
  */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
  * Returns the array of elements that match the given CSS selector.
  * @param {string} selector - CSS query selector
  * @returns {object[]} array of DOM objects matching the query.
  */
  function qsa(selector) {
   return document.querySelectorAll(selector);
  }

})();
