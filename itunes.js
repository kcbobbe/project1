$(document).ready(function() {
  
  var artistName = "Twin Peaks";

  function getItunes(artistName){
    $.ajax({
      url: "https://itunes.apple.com/search?term=$" + artistName +"&media=music" + "&limit=5",
      method:"GET"
    }).then(function(response){
      var parsedResponse = JSON.parse(response);
      console.log(parsedResponse.results[0].previewUrl)
      // console.log(parsedResponse[0].previewUrl);
      $("#sampleAudio").attr("src", parsedResponse.results[0].previewUrl);
      $("#sampleAudio").attr("type", "audio/m4a")

      $("#songName").text(parsedResponse.results[0].trackName);
      $("#albumName").text(parsedResponse.results[0].collectionName);
      $("#songImg").attr("src", parsedResponse.results[0].artworkUrl100);
      console.log(JSON.parse(response))
  
    })
  }

  getItunes(artistName)
  
  })