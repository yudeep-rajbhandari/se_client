import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './leaflet.css';
import L from "leaflet";


import RoutineMachine from "./routingmachine.component";
export default function LeafletComponent(props){
    const position1 = [51.505, -0.09]
    const[isPosition,setisPosition] = useState(false)
    const[mypos,setMypos] = useState(false)

    const [position,setPosition] = useState({
        lat:31.5451836,
        lng:-97.1174557,
        zoom: 7,

        isMapInit:false
    })
    const [ currentPosition, setCurrentPosition ] = useState({});



    function success(pos) {

        const latitude  = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        console.log("currentpos",pos)
        const currentPosition = {
            lat:  latitude,
            lng: longitude
        }
        setCurrentPosition(currentPosition);


    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const getCurrentLocation= ()=>{

        navigator.geolocation.getCurrentPosition(success);
    }
    useEffect(() => {
        setisPosition(true)
        getCurrentLocation()
        const interval = setInterval(() => {
            getCurrentLocation()
        }, 10000);

    },[])





    return (
        <MapContainer center={[position.lat,position.lng]} zoom={2}scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {isPosition && <RoutineMachine dest = {props} key={currentPosition.lat} current={currentPosition}/>}
        </MapContainer>
    );
}
