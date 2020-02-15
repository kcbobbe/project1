$(document).ready(function() {

  // local storage setup -- for saved events panel
  if(!localStorage.getItem("favoriteEvents")){
    var favoriteEvents = [];
  } else{
    var favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents"));
    createFavoriteEvents()
  }

  // related artist API -- Taste Dive
  var tasteDiveApiKey = "355215-KatieBob-H8EY3UTU"
  
  function getRelated(artistName){
    $("#relatedArtists").text("");
    $.ajax({
      dataType: "jsonp",
      url: "https://tastedive.com/api/similar?q=" + artistName + "&k=" + tasteDiveApiKey + "&type=music" + "&limit=5",
      method:"GET"
    }).then(function(response){
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
      getItunes(artist);
      getEventData(artist);
      getRelated(artist);
    }
  })
  
// iTunes API

    var parsedResponse = "";
    function getItunes(artistName){
      $("#songContainer").text("");
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=$" + artistName +"&media=music" + "&limit=5",
        method:"GET"
      }).then(function(response){
        parsedResponse = JSON.parse(response);
        $("#artistName").text("Listen to " + parsedResponse.results[0].artistName)
        for (var i = 0; i < parsedResponse.results.length; i++){
          var newSongContainer = $("<tr>")
          newSongContainer.attr("data-id", i)
          var newSongNumber = $("<th>");
          newSongNumber.text(i+1);
          var newSongName = $("<td>");
          newSongName.text(parsedResponse.results[i].trackName);
          var newAlbumName = $("<td>");
          newAlbumName.text(parsedResponse.results[i].collectionName);
          newSongContainer.append(newSongNumber,newSongName,newAlbumName);
          $("#songContainer").append(newSongContainer)
        }
        getNowPlaying(0)
    
      })
    }
  // creates top section of the itunes panel with audio, song name, album name, and album art
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
        getNowPlaying(parentElement.attr("data-id"))
    })
  
      // bands in town api
        var bandsInTownApiKey = "codingbootcamp";  
        var hasEvent = "";

        function getArtistData(artistName) {
          $.ajax({
            url: "https://rest.bandsintown.com/artists/" + artistName + "/?app_id=" + bandsInTownApiKey,
            method: "GET"
          }).then(function(response){
            $("#bandName").text(response.name);
            $("#bandImg").attr("src", response.image_url);
          });
        }
                
        function getEventData(artistName){
          $.ajax({
            url: "https://rest.bandsintown.com/artists/" + artistName + "/events/?app_id=" + bandsInTownApiKey,
            method:"GET"
          }).then(function(response){
            hasEvent = response[0];
            if(!hasEvent) {
              getArtistData(artistName);
              $("#eventVenue").text("No upcoming events");
              $("#eventCity").text("Stay tuned for future events!");
              $("#buyTickets").text("No tickets available");
              $("#eventDate").text("");
              $("#lineup").text("");
              $("#saleDate").text("");
              $("#facebook").attr("href", "https://facebook.com");
              $("#addToEvents").css("display","none");
            } else {
              $("#bandName").text(response[0].artist.name);
              $("#bandImg").attr("src", response[0].artist.image_url);
              var eventDate = moment(response[0].datetime).format("MM/DD/YYYY");
              $("#eventDate").text(eventDate);
              $("#buyTickets").attr("href", response[0].offers[0].url)
              $("#eventCity").text("Next event in: " + response[0].venue.city);
              $("#eventVenue").text("@ " + response[0].venue.name);
              $("#facebook").attr("href", response[0].artist.facebook_page_url);

              var hasSaleDate = response[0].on_sale_datetime;
              if(hasSaleDate) {
                var saleDate = moment(response[0].on_sale_datetime).format("MM/DD/YY");
                $("#saleDate").text("Tickets go on sale " + saleDate);
              } else {
                $("#saleDate").text("");
              }

              var hasLineup = response[0].lineup[1];
              if(hasLineup) {
                $("#lineup").text("Supporting artist: " + response[0].lineup[1]);
              } else {
                $("#lineup").text("Supporting artist: N/A");
              }
              
              $("#addToEvents").css("display","");
              eventInfo.artist = response[0].artist.name;
              eventInfo.date = response[0].datetime;
              eventInfo.location = response[0].venue.name
            };        
          })
        }
    
    // searches
    //search on landing page
    $("#landingPageForm").on('submit', function(e){
      e.preventDefault();
      var artistSearch2 = $("#landingSearchField").val();
      if (artistSearch2 !=""){
        $("#landingSearchField").val("");
        $("#landingPage").css("display","none");
        $("#mainPage").css("display","");
        getEventData(artistSearch2)
        getItunes(artistSearch2);
        getRelated(artistSearch2);
      }
    })

    //submit search
    $("#search-form").on('submit',function(e){
      e.preventDefault();
      var artistSearch = $("#searchField").val();
      if (artistSearch !=""){
        getEventData(artistSearch);
        getItunes(artistSearch);
        getRelated(artistSearch);
        $("#searchField").val("");
      }
    })


    // add event to favorites feature

    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    // use this function to order the event favorites array in order chronologically
      // object is saved with the event information for the current search
    var eventInfo = {
      date: "",
      artist: "",
      location: ""
    }

    function compare(a, b) {
      if (a[0] > b[0]) return 1;
      if (b[0] > a[0]) return -1;
      return 0;
    }

    $("#addToEvents").on('click', function(e){
      e.preventDefault();
      // current work around for eventInfo pointing to a reference, not value
      // if I just push eventInfo to favoriteEvents, each time eventInfo changes, all of the values pointing to eventInfo change to most recent assignment
      favoriteEvents.push(Object.values(eventInfo));
      favoriteEvents.sort(compare);
      localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents))
      createFavoriteEvents()

    })
// creating the saved events panel. Is hidden unless there is an item in the array
    function createFavoriteEvents() {
      $("#favoriteEventsSection").css("display", "");
      $("#favoriteEventsContainer").text("");
      for (var i = 0; i < favoriteEvents.length; i++){
        //only shows up if the event is still in the future
        if ((moment(favoriteEvents[i][0])).format("YYYYMMDD") >= (moment().format("YYYYMMDD"))){
        var newEventContainer = $("<tr>")
        newEventContainer.attr("data-event", i)
        var newEventDate = $("<td>");
        var parsedDate = moment(favoriteEvents[i][0]).format("MM/DD/YYYY")
        newEventDate.text(parsedDate);
        var newEventArtist = $("<td>");
        newEventArtist.text(favoriteEvents[i][1]);
        var newEventLocation = $("<td>");
        newEventLocation.text(favoriteEvents[i][2]);
        newEventContainer.append(newEventDate,newEventArtist,newEventLocation);
        $("#favoriteEventsContainer").append(newEventContainer)
        }
      }
    }
// when the clear events button is clicked
    $("#clearEvents").on('click', function(e){
      e.preventDefault();
      clearEvents();
    })

    function clearEvents(){
      $("#favoriteEventsSection").css("display", "none");
      $("#favoriteEventsContainer").text("");
      favoriteEvents = [];
      localStorage.clear();
    }
// when the BandiFi title is clicked in the nav bar, brings back to landing page
    $("#backToLanding").on('click', function(e){
      e.preventDefault();
      $("#landingPage").css("display","");
      $("#mainPage").css("display","none");
    })
    

//page animations
    $(".panel").slideDown(1500);
    // $(".columns").fadeIn();
  })
