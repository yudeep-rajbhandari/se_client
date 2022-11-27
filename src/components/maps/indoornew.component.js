import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup,Tooltip } from 'react-leaflet';
import './leaflet.css';
import L from "leaflet";
import { divIcon } from 'leaflet';
import RoutineMachine from "./routingmachine.component";
import IndoorMachine from "./leafindoor.component";
import { renderToStaticMarkup } from 'react-dom/server';

export default function LeafletComponent1(){
    const position1 = [51.505, -0.09]
    const[marker1,setMarker1] = useState("myhouse")
    const[isPosition,setisPosition] = useState(false)
    const[mypos,setMypos] = useState(false)

    const [position,setPosition] = useState({
        lat: 31.5463065,
        lng:-97.118471,
        zoom: 66,

        isMapInit:false
    })
    const [ currentPosition, setCurrentPosition ] = useState({});

    function success(pos) {
        console.log("<<<<<<<<<<<",mypos)
        const latitude  = pos.coords.latitude;
        const longitude = pos.coords.longitude;

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

    },[])






    return (
        <MapContainer center={[position.lat,position.lng]} zoom={position.zoom}scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            />
            {isPosition && <IndoorMachine id ='1' key={currentPosition.lat} current={currentPosition}/>}
        </MapContainer>
    );
}