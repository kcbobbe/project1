# BandiFi
https://kcbobbe.github.io/project1/

## Description

BandiFi is a hub for discovering events, top songs, and related artists of your favorite bands. Find out when and where artists are performing next. Discover and listen to samples of the artist's top five songs trending on iTunes. Save upcoming events so that you can keep track of upcoming concerts of your favorite bands.

## Installation

1. Clone the repository to your computer

2. Open the project in a text editor of your choice

3. Open the index.html file in your browser to view

## Usage
1. Upon loading BandiFi, the user will be presented with a landing page, which features a search bar. The user can enter an artist name into the search bar and press enter or click the search button.

2. After entering the search criteria, the user is presented with a dashboard with three panels. 

3. The upper left panel (or top panel in mobile) features an artist information card. The name of the artist, picture, next event location, date, venue, and supporting artist for the event are shown.

4. Three buttons (when applicable to the artist) appear in the lower section of the artist information card, a Facebook button, a "Buy Tickets Here" button, and an "Add to Your Events" button.
* Upon clicking the Facebook button, the user will be directed to that artist's Facebook page.
* Upon clicking the "Buy Tickets Here" button, the user will be direct to the site where the tickets are being sold.
* Upon clicking the "Add to Your Events" button, a new panel will appear in the lower right hand corner. The added event's date, artist, and venue will be added to this saved event panel.

5. In the upper right panel (or third from the top on mobile), there is an iTunes player. The top 5 songs for that artist on iTunes will be shown. A user can choose a song, then press the "play" button on the media player to hear a 30 second sample of the chosen song.

6. In the lower left hand corner, there are five artists that are similar to the artist that was searched. Click on one of these artists and the page will be populated with the data for that artist. 

7. A user can search for a new artist by using the search bar in the navigation bar. If the user wants to see the landing page again, they can click the "BandiFi" brand on the left side of the navigation bar.

## Key Features
* Search for artists and see if they are have an upcoming event.

* Follow a link to view the artist's Facebook page.

* Follow a link to buy tickets for the artist's upcoming event.

* Discover the top five songs of the artist on iTunes. Listen to a 30 second sample of each song.

* Save your favorite events and see a list of  saved upcoming events. This list is saved to local storage, so even if the page is refreshed, the list will still be there.

* Discover new artists by clicking on one of five recommended artists.

## Future Improvements and Features

* Add more error handling for edge cases when a certain value is not returned by the APIs.

* Add error handling for when an invalid artist name is entered

* Optimize loading times to create a more polished experience for the user

* Enhance mobile styling

## Technologies Used

* HTML
* CSS
* JavaScript
* jQuery
* Bulma CSS Framework
* moment.js
  * moment.js was used to parse dates returned from the APIs
* iTunes API
  * Used to list and play the top 5 tracks for a artist
* TasteDive API
  * Used to list five related artists
* Bands in Town API
  * Used to get the artist photo, upcoming event information , including event location, venue, supporting artist, ticket sale information and link, and the Facebook link

## Credits
* Photo by Vishnu R Nair from Pexels

## License
MIT License


---

