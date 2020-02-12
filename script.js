$(document).ready(function() {

  //artist name should be set from what is entered from the search bar
  var initialArtist = "Twin Peaks";

  // related artist API -- Taste Dive

  var tasteDiveApiKey = "355215-KatieBob-H8EY3UTU"
  
  getRelated(initialArtist)
  
  function getRelated(artistName){
    $("#relatedArtists").text("");
    $.ajax({
      dataType: "jsonp",
      url: "https://tastedive.com/api/similar?q=" + artistName + "&k=" + tasteDiveApiKey + "&type=music" + "&limit=5",
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
      getItunes(artist);
      getEventData(artist);
      getRelated(artist);
    }
  })
  
// iTunes API
  
    // var artistName = "Sons of Apollo";
    var parsedResponse = "";
  
    getItunes(initialArtist)
  
    function getItunes(artistName){
      $("#songContainer").text("");
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
          newSongContainer.attr("data-id", i)
          var newSongNumber = $("<th>");
          newSongNumber.text(i+1);
          // newSongNumber.attr("id", i)
          var newSongName = $("<td>");
          newSongName.text(parsedResponse.results[i].trackName);
          var newAlbumName = $("<td>");
          newAlbumName.text(parsedResponse.results[i].collectionName);
          console.log(newSongName)
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
        $("#songContainer").children().removeClass("active-song")
        var parentElement = ($(e.target).parent());
        parentElement.attr("class", "active-song");
       // console.log(parentElement.attr("data-id"))
        getNowPlaying(parentElement.attr("data-id"))
    })
  
      // bands in town api 
        var bandsInTownApiKey = "codingbootcamp";
        
        // var artistName = "Twin Peaks";
        
        // $.ajax({
        //   url: "https://rest.bandsintown.com/artists/" + artistName + "?app_id=" + APIKEY,
        //   method: "GET"
        // }).then(function(response){
        //   $("#bandName").text(response.name);
        //   $("#bandImg").attr("src", response.image_url)
        //   console.log(response)
        //   getEventData()
        // })
        
        getEventData(initialArtist)
        
        function getEventData(artistName){
          $.ajax({
            url: "https://rest.bandsintown.com/artists/" + artistName + "/events/?app_id=" + bandsInTownApiKey,
            method:"GET"
          }).then(function(response){
            (console.log("bands in town response", response))
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
        
        

    //submit search
    $("#search-form").on('submit',function(e){
      e.preventDefault();
      var artistSearch = $("#searchField").val();
      console.log(artistSearch)
      getEventData(artistSearch);
      getItunes(artistSearch);
      getRelated(artistSearch);
      $("#searchField").val("");
    })


    })