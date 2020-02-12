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
    var eventDate = moment.parseZone(response[0].datetime);
    $("#eventDate").text("Concert date: " + eventDate._d);
    $("#buyTickets").attr("href", response[0].offers[0].url)
    $("#eventCity").text("Next event in: " + response[0].venue.city);
    $("#eventVenue").text("Venue: " + response[0].venue.name);
    $("#facebook").attr("href", response[0].artist.facebook_page_url);
    var saleDate = moment.parseZone(response[0].on_sale_datetime);
    $("#saleDate").text("Tickets go on sale " + saleDate._d);
    $("#lineup").text("Supporting artist: " + response[0].lineup[1]);
    console.log(response);

  })
}

})