// map.js is used to display Google Maps for properties
function initMap(latitude, longitude) {
    //var nyc = {lat: 40.7128, lng: -74.0061};
    var location = {lat: latitude, lng: longitude};
    var myOptions = {
      center: location,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      streetViewControl: false,
      zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map-display'), myOptions);
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    // Resize stuff...
    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
    });
};

function geoFindMe() {
    if (!navigator.geolocation){
      alert("Geolocation is not supported by your browser.");
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var loc = latitude + ',' + longitude;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc + "&sensor=true";
      //document.getElementById('address-autocomplete').value = addressFill;
      $.get(url, function(data){
          var city = data.results[0].address_components[3].long_name;
          var state = data.results[0].address_components[5].short_name;
          var addressFill = city + ", " + state;
          //document.getElementById('address-autocomplete').value = addressFill;
          //document.getElementById('property-city-display').value = city;
          $('#address-autocomplete').val(addressFill);
          $('#property-city-display').text(state + ' - ' + city + ' homes');
      });
      initMap(latitude, longitude); // Automatically display map with center as this location
    };

    function error() {
      alert("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
};

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
};

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map-display'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14,
      mapTypeId: 'roadmap',
      panControl: false,
      streetViewControl: false,
      rotateControl: false
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('address-autocomplete');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
};
