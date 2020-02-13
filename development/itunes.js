$(document).ready(function() {
  
  var artistName = "Sons of Apollo";
  var parsedResponse = "";

  getItunes(artistName)

  function getItunes(artistName){
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=$" + artistName +"&media=music" + "&limit=5",
      method:"GET"
    }).then(function(response){
      parsedResponse = JSON.parse(response);
      $("#artistName").text(parsedResponse.results[0].artistName)
      console.log(parsedResponse.results[0].previewUrl)
      // console.log(parsedResponse[0].previewUrl);
      for (var i = 0; i < parsedResponse.results.length; i++){
        var newSongContainer = $("<tr>")
        newSongContainer.attr("id", i)
        var newSongNumber = $("<th>");
        newSongNumber.text(i+1);
        // newSongNumber.attr("id", i)
        var newSongName = $("<td>");
        newSongName.text(parsedResponse.results[i].trackName);
        var newAlbumName = $("<td>");
        newAlbumName.text(parsedResponse.results[i].collectionName);
        console.log(newSongName)
        console.log("why")
        newSongContainer.append(newSongNumber,newSongName,newAlbumName);
        $("#songContainer").append(newSongContainer)
      }
      getNowPlaying(0)
  
    })
  }

  function getNowPlaying(index) {
      $("#sampleAudio").attr("src", parsedResponse.results[index].previewUrl);
      $("#sampleAudio").attr("type", "audio/m4a")
      $("#songName").text(parsedResponse.results[index].trackName);
      $("#albumName").text(parsedResponse.results[index].collectionName);
      $("#songImg").attr("src", parsedResponse.results[index].artworkUrl100);
  }

  $("#songContainer").on('click', function(e){
    e.preventDefault();
      var parentElement = ($(e.target).parent())
      console.log(parentElement[0].id)
      getNowPlaying(parentElement[0].id)
  })

  
  })

  