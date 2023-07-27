
import React, { useEffect } from "react";

const Map = () => {
  const hotelName = "400, Prahlad Nagar, Holiday Inn Express, Ahmedabad, India"; // Replace with the actual hotel name
  const hotelLatitude = 23.022505; // Example hotel latitude
  const hotelLongitude = 72.571362; // Example hotel longitude



  useEffect(() => {
    // Load the Google Maps JavaScript API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA1fdPi5_I43IVxS4Zlw57iUrwlGdBv8&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Initialize the map
    window.initMap = () => {
      const geocoder = new window.google.maps.Geocoder();
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: hotelLatitude, lng: hotelLongitude },
        zoom: 15,
      });

      const hotelMarker = new window.google.maps.Marker({
        position: { lat: hotelLatitude, lng: hotelLongitude },
        map: map,
        title: hotelName,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${hotelName}</strong></div>`,
      });

      hotelMarker.addListener("click", () => {
        infoWindow.open(map, hotelMarker);
      });

      // Add nearby sightseeing locations
      const sightseeingLocations = [
        {
          name: "Lakeview Park",
          latitude: 23.022610,
          longitude: 72.571840,
        },
        {
          name: "Sai Tempale",
          latitude: 23.022810,
          longitude: 72.566940,
        },
        {
          name: "Kakariya Lake",
          latitude: 23.0197,
          longitude: 72.5723,
        },
        {
          name: "Akhsardham Temple",
          latitude: 23.022810,
          longitude: 72.561540,
        },
        {
          name: "Waterpark",
          latitude: 23.0197,
          longitude: 72.5710,
        },
        {
          name: "Woodland Resurant",
          latitude: 23.0197,
          longitude: 72.5740,
        },
      ];

      sightseeingLocations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
          title: location.name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        const distance = calculateDistance(
          hotelLatitude,
          hotelLongitude,
          location.latitude,
          location.longitude
        );

        const sightseeingInfoWindow = new window.google.maps.InfoWindow({
          content: `<div>
            <strong>${location.name}</strong>
            <br/>
            Distance from hotel: ${distance.toFixed(2)} km
          </div>`,
        });

        marker.addListener("click", () => {
          sightseeingInfoWindow.open(map, marker);
        });
      });
    };


          

  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <div style={{ borderTop: "1px solid lightgrey", marginTop: "50px" }}>
        <h1 style={{ marginTop: "3%" }}>Welcome to Holiday Inn</h1>
        <p style={{ marginBottom: "3%" }}>
          Explore our location on the map below:
        </p>
      </div>
      

      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          marginBottom: "50px",
          borderTop: "1px solid lightgrey",
          borderBottom: "1px solid lightgrey",
          marginTop: "40px",
        }}
      ></div>

    </div>
  );
};

export default Map;






