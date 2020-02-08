$(document).ready(function() {

  // related artist API
  
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
  
// iTunes API
  
    var artistName = "Sons of Apollo";
    var parsedResponse = "";
  
    getItunes(artistName)
  
    function getItunes(artistName){
      $.ajax({
        url: "https://itunes.apple.com/search?term=$" + artistName +"&media=music" + "&limit=5",
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
  
      // bands in town api 
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