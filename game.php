<?php

# Name: Nadir Tareen
# Date: May 17, 2019
# Section: AJ
# This is the web service to implement the 2 Truth and 1 Lie Game on my website

$game = array();
$statement0 = array();
$statement0["statements"] = "I have three pet snakes,I have a three legged pet cat,
I have four pet peacocks";
$statement0["answer"] = "I have three pet snakes";
$statement0["id"] = 0;
$statement1 = array();
$statement1["statements"] = "I am certified to scuba dive,I have bungee jumped twice,
I have skydived";
$statement1["answer"] = "I have skydived";
$statement1["id"] = 1;
$statement2 = array();
$statement2["statements"] = "I dont like mangoes,I dont like french fries,I dont like chocolate";
$statement2["answer"] = "I dont like chocolate";
$statement2["id"] = 2;
$statement3 = array();
$statement3["statements"] = "I've never been arrested,I've never had a car accident,I've never broken a bone";
$statement3["answer"] = "I've never had a car accident";
$statement3["id"] = 3;
$statement4["statements"] = "In my gap year I volunteered at an animal shelter,
In my gap year I worked as a physical trainer,In my gap year I worked at a film production company";
$statement4["answer"] = "In my gap year I worked as a physical trainer";
$statement4["id"] = 4;
$game["0"] = $statement0;
$game["1"] = $statement1;
$game["2"] = $statement2;
$game["3"] = $statement3;
$game["4"] = $statement4;
$comment0 = "Back home in Pakistan, there are many animals that roam around in our garden that we take care of but I am glad they arent snakes";
$comment1 = "I wish I had skydived to be honest";
$comment2 = "I detest mangoes and french fries don't really do it for me either. But hating chocolate is sinful";
$comment3 = "Been in several of them. Traffic is pretty rough where I'm from :/";
$comment4 = "That would've been a fun job, but my gap year was great nonetheless";
$comments = array($comment0, $comment1, $comment2, $comment3, $comment4);

if (isset($_GET["type"])) {
  $type = $_GET["type"];
  if ($type === "statement") {
    $rand = mt_rand(0, count($game));
    header("Content-Type: application/json");
    $ret = $game[$rand];
    echo json_encode($ret);
  } else if ($type === "comment") {
    if (isset($_GET["value"])) {
      $val = $_GET["value"];
      header("Content-Type: text/plain");
      echo $comments[$val];
    } else {
      header("HTTP/1.1 400 Invalid Request");
      echo "required parameter value";
    }
  } else {
    header("HTTP/1.1 400 Invalid Request");
    echo "required paramater statement";
  }
} else {
  echo "required paramater type";
}

?>
