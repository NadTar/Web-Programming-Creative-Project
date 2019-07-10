<?php

  # Name: Nadir Tareen
  # Date: May 31, 2019
  # Section: AJ
  # This is the web service to implement the travel log on my website

  include "common.php";

  $method = $_SERVER['REQUEST_METHOD'];
  if ($method === "GET") {
    if (isset($_GET["filter"])) {
      $filter = $_GET["filter"];
      if ($filter !== "all" && $filter !== "visited" && $filter !== "novisit") {
        header("HTTP/1.1 400 Invalid Request");
        echo "filter can only be of type all, visited or novisit";
      } else {
        $table = get_table($filter);
        header("Content-Type: application/json");
        echo ($table);
      }
    } else {
      header("HTTP/1.1 400 Invalid Request");
      echo "required paramater filter of type all, visited or novisit ";
    }
  }
  else if ($method === "POST") {
    if (check_post_params()) {
      $message = table_insert($_POST["place"], $_POST["country"], $_POST["interests"]);
      header("Content-Type: text/plain");
      echo ($message);
    } else {
      header("HTTP/1.1 400 Invalid Request");
      echo "missing required post parameters: place, country and interests";
    }
  }

 /**
  * gets the table from the database with the given filter
  * @param {string} $filter - represents the current filter requested
  */
  function get_table($filter) {
    $db = get_PDO();
    $query = "SELECT place, country, visited, date, interests FROM travellog ORDER BY id DESC;";
    if ($filter === "visited") {
      $query = "SELECT place, country, visited, date, interests FROM travellog WHERE visited = 1
      ORDER BY id DESC;";
    } else if ($filter === "novisit") {
      $query = "SELECT place, country, visited, date, interests FROM travellog WHERE visited = 0
      ORDER BY id DESC;";
    }
    try {
      $rows = $db->query($query);
      $row = $rows->fetchAll(PDO::FETCH_ASSOC);
      return json_encode($row);
    } catch (PDOException $ex) {
      handle_db_error("Unable to access database for request");
    }
  }

 /**
  * executes the post request for inserting suggestions into the table
  * @param {string} $place - name of the place suggested by the user
  * @param {string} $country - country of the place suggested by the user
  * @param {string} $interests - interests for the place suggested by the user
  */
  function table_insert($place, $country, $interests) {
    $db = get_PDO();
    try {
      $sql = "INSERT INTO travellog(place, country, visited, interests) " .
             "VALUES (:place, :country, :visited, :interests);";
      $stmt = $db->prepare($sql);
      // # create the associative array between the variables in the
      // # insert SQL statement with the actual values
      $params = array("place" => $place, "country" => $country, "visited" => 0,
      "interests" => $interests);
      $stmt->execute($params);
      return "success successfully posted " . $place . ", " . $country . " with points of interest
      : " . $interests . " to the travel log";
    } catch (PDOException $ex) {
      handle_db_error("Could not insert into database. Please try again later");
    }
  }

 /**
  * checks whether the valid post parameters have been set
  * @return {bool} - represents whether the post paramaters are valid
  */
  function check_post_params() {
    return (isset($_POST["place"]) && isset($_POST["country"]) && isset($_POST["interests"]));
  }
?>
