$(document).ready(function() {
  
var APIKEY = "355215-KatieBob-H8EY3UTU"

getRelated("Pink Floyd")

function getRelated(artistName){
  $.ajax({
    dataType: "jsonp",
    url: "https://tastedive.com/api/similar?q=" + artistName + "&?k=" + APIKEY + "&limit=5",
    method:"GET"
  }).then(function(response){
    console.log(response)
    for (var i=0; i < response.Similar.Results.length; i++) {
      var relatedArtist = $("<button>");
      relatedArtist.attr("class","button");
      relatedArtist.attr("id", response.Similar.Results[i].Name);
      relatedArtist.text(response.Similar.Results[i].Name);
      $("#relatedArtists").append(relatedArtist);
    }
  })
}


$("#relatedArtists").on('click', function(e){
  if (e.target.matches('button')){
    e.preventDefault();
    var artist = (e.target.id);
    console.log(artist);
    //itunesSearch(artistName)
    //bandsInTownSearch(artistName)
  }
})

})
