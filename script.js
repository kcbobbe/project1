$(document).ready(function() {

  // object is saved with the event information for the current search
  var eventInfo = {
    date: "",
    artist: "",
    location: ""
  }
  // array of objects to be stored and retrieved in local storage (saved events)
  // local storage setup
  if(!localStorage.getItem("favoriteEvents")){
    var favoriteEvents = [];
  } else{
    var favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents"));
    createFavoriteEvents()
    // localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents))
  }

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
      // console.log(response)
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
        $("#artistName").text("Listen to " + parsedResponse.results[0].artistName)
        // console.log(parsedResponse.results[0].previewUrl)
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
          // console.log(newSongName)
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
        
        getEventData(initialArtist)
        var hasEvent = "";

        function getArtistData(artistName) {
          $.ajax({
            url: "https://rest.bandsintown.com/artists/" + artistName + "/?app_id=" + bandsInTownApiKey,
            method: "GET"
          }).then(function(response){
            console.log("bandsintown artist info: ", response.name);
            $("#bandName").text(response.name);
            $("#bandImg").attr("src", response.image_url);
          });
        }

        getArtistData(initialArtist);
        console.log("event available?" + hasEvent);
        
        getEventData(initialArtist)
        
        function getEventData(artistName){
          $.ajax({
            url: "https://rest.bandsintown.com/artists/" + artistName + "/events/?app_id=" + bandsInTownApiKey,
            method:"GET"
          }).then(function(response){
            // console.log("bandsintown events response", response[0]);
            hasEvent = response[0];
            console.log("event avail?", hasEvent);
          
            
            if(!hasEvent) {
              console.log("no event");
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
              console.log("YES EVENT");
              $("#bandName").text(response[0].artist.name);
              $("#bandImg").attr("src", response[0].artist.image_url);
              var eventDate = moment.parseZone(response[0].datetime);
              $("#eventDate").text("Concert date: " + eventDate._d);
              $("#buyTickets").attr("href", response[0].offers[0].url)
              $("#eventCity").text("Next event in: " + response[0].venue.city);
              $("#eventVenue").text("Venue: " + response[0].venue.name);
              $("#facebook").attr("href", response[0].artist.facebook_page_url);
              var saleDate = moment.parseZone(response[0].on_sale_datetime);
              $("#saleDate").text("Tickets go on sale " + saleDate._d);
              $("#lineup").text("Supporting artist: " + response[0].lineup[1]);
              $("#addToEvents").css("display","");
                          //
              eventInfo.artist = response[0].artist.name;
              eventInfo.date = response[0].datetime;
              eventInfo.location = response[0].venue.name
              console.log(eventInfo, "event info")
            };
            // console.log(response);
        
          })
        }

      // console.log("event y/n?", eventData);
      // if(eventData === "undefined") {
      //   getArtistData();
      //   console.log("YES");
      // } else {
      // };
        
        

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


   

    // add event to favorites
    $("#addToEvents").on('click', function(e){
      e.preventDefault();
      // current work around for eventInfo pointing to a reference, not value
      // if I just push eventInfo to favoriteEvents, each time eventInfo changes, all of the values pointing to eventInfo change to most recent assignment
      favoriteEvents.push(Object.values(eventInfo));
      favoriteEvents.sort(compare);
      createFavoriteEvents();
      localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents))
      console.log('click')
      console.log(JSON.parse(localStorage.getItem("favoriteEvents")), "from local storage")
      console.log(favoriteEvents, "these are my favorite events")
      createFavoriteEvents()

    })

    function createFavoriteEvents() {
      $("#favoriteEventsSection").css("display", "");
      $("#favoriteEventsContainer").text("");
      for (var i = 0; i < favoriteEvents.length; i++){
        if ((moment(favoriteEvents[i][0])).format("YYYYMMDD") > (moment().format("YYYYMMDD"))){
        console.log("date-difference", (moment(favoriteEvents[i][0]).format("YYYYMMDD") > (moment().format("YYYYMMDD"))));
        var newEventContainer = $("<tr>")
        newEventContainer.attr("data-event", i)
        var newEventDate = $("<td>");
        var parsedDate = moment(favoriteEvents[i][0]).format("MM/DD/YYYY")
        newEventDate.text(parsedDate);
        var newEventArtist = $("<td>");
        newEventArtist.text(favoriteEvents[i][1]);
        var newEventLocation = $("<td>");
        newEventLocation.text(favoriteEvents[i][2]);
        // adding modal to each row -- I played around with this idea but will probably end up deleting it
        // var newModal = $("<div>").addClass("modal");
        // <div class="modal">
        // var newModalBackground = $("<div>").addClass("modal-background");
        // var newModalContent = $("<div>").addClass("modal-content");
        // creating modal main
        // var newModalMain = $("<div>").addClass("card");
        // var newHeader = $("<p>").addClass("card-header-title").text(favoriteEvents[i][1]);    
        // var newCardContent = $("<div>").addClass("card-content");
        // var newCardMain = $("<div>").addClass("content").text(favoriteEvents[i][2]);
        // var newCardDate = $("<div>").text((moment(favoriteEvents[i][0]).format("MM/DD/YYYY")));
        // var viewArtist = $("<button>").text("View Artist").attr("id","viewArtist").addClass("btn btn-info is-large");
        // viewArtist.attr("data-artist", favoriteEvents[i][1]);
        // var removeFromEvents = $("<button>").text("Remove Event").attr("id","removeEvent").addClass("btn btn-danger is-large");
        // newCardContent.append(newCardMain, newCardDate, viewArtist, removeFromEvents);
        // newModalMain.append(newHeader, newCardContent);
        // newModalContent.append(newModalMain);
          // <!-- Any other Bulma elements you want -->
        // var newModalClose = $("<div>").addClass("modal-close is-large").attr("aria-label", "close")
        // newModal.append(newModalBackground, newModalContent, newModalClose);
        newEventContainer.append(newEventDate,newEventArtist,newEventLocation);
        $("#favoriteEventsContainer").append(newEventContainer)
        }
      }

    }

    $("#favoriteEventsContainer").on('click', function(e){
      e.preventDefault();
      ($(e.target).parent()).children(".modal").addClass("is-active");
      //   var parentElement = ($(e.target).parent());
      //   parentElement.attr("class", "active-song");
      //  // console.log(parentElement.attr("data-id"))
      //   getNowPlaying(parentElement.attr("data-id"))
    })

    $("#viewArtist").on('click', function(e){
      e.preventDefault();
      // var viewArtistName = e.target.parent().attr("data-artist")
      console.log(e.target, 'e.target');
      console.log(click)
      // console.log(e.target.attr("data-artist"))
      // $(".modal").removeClass('is-active');
      // getItunes(viewArtistName);
      // getEventData(viewArtistName);
      // getRelated(viewArtistName);

    })
  

    // $(".modal-close").on('click', function(e){
    //   e.preventDefault();
    //   $(".modal").removeClass('is-active');
    // })

    $("#clearEvents").on('click', function(e){
      e.preventDefault();
      clearEvents();
    })

    function clearEvents(){
      $("#favoriteEventsSection").css("display", "none");
      $("#favoriteEventsContainer").text("");
      localStorage.clear();
    }

    function compare(a, b) {
      if (a[0] > b[0]) return 1;
      if (b[0] > a[0]) return -1;
    
      return 0;
    }

  })
