$(document).ready(function() {
var APIKEY = "codingbootcamp";

var artistName = "Twin Peaks";

// $.ajax({
//   url: "https://rest.bandsintown.com/artists/" + artistName + "?app_id=" + APIKEY,
//   method: "GET"
// }).then(function(response){
//   $("#bandName").text(response.name);
//   $("#bandImg").attr("src", response.image_url)
//   console.log(response)
//   getEventData()
// })

getEventData(artistName)

function getEventData(artistName){
  $.ajax({
    url: "https://rest.bandsintown.com/artists/" + artistName + "/events/?app_id=" + APIKEY,
    method:"GET"
  }).then(function(response){
    $("#bandName").text(response[0].artist.name);
    $("#bandImg").attr("src", response[0].artist.image_url)
    $("#eventDate").text(response[0].datetime);
    $("#buyTickets").attr("href", response[0].offers[0].url)
    console.log(response)

  })
}

})