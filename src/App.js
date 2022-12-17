import { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import {FlyToInterpolator} from '@deck.gl/core';
import { ImLocation } from "react-icons/im";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./app.css"

import Fly from "./Components/Fly";
import DataShow from "./Components/DataShow";

function App() {

// Setting up the state for the latitude
// and longitude
const [lat, setLat] = useState(22.5726);
const [lon, setLon] = useState(88.3639);


// Setting up the state for the map
const [viewport, setViewport] = useState({
	latitude: lat,
	longitude: lon,
	zoom: 12,
	bearing: 0,
	pitch: 0,
	width: "70vw",
	height: "60vh",
});


// Map viewport updates whenever the
// latitude and longitude changes
useEffect(() => {
	setViewport({
	latitude: lat,
	longitude: lon,
	zoom: 12,
	transitionInterpolator:
		new FlyToInterpolator({ speed: 1.0 }),
	transitionDuration: "auto",
	width: "70vw",
	height: "60vh"
	});
}, [lat, lon]);

return (
  <div className="main_container" >
    <div className="top_input_container" >
		<Fly setLat={setLat} setLon={setLon} />
		<div  className="coordinates_container">
			<h3>Longitude : </h3><span>{lon}</span>
			<h3>Latitude : </h3><span>{lat}</span>
		</div>
	</div>
    <div>
		<ReactMapGL
			mapboxApiAccessToken={"pk.eyJ1IjoidmlubnUxMjMiLCJhIjoiY2xib25ybGQ3MDdvZTNuczVtNThkbGtoOSJ9.N4J6du4unwtxArPUvxwrpg"}
			{...viewport}
			onViewportChange={(viewport) => setViewport(viewport)}			
			>
			<Marker latitude={lat} longitude={lon}>
				<ImLocation size="30px" />
			</Marker>
		
		</ReactMapGL>
	</div>
	<DataShow />
  </div>
  
);
}

export default App;
