import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './leaflet.css';


import RoutineMachine from "./routingmachine.component";
import IndoorMachine from "./leafindoor.component";
export default function LeafletComponent1(){
    const position1 = [51.505, -0.09]
    const[isPosition,setisPosition] = useState(false)
    const[mypos,setMypos] = useState(false)

    const [position,setPosition] = useState({
        lat: 31.54553361,
        lng:-97.1152046,
        zoom: 44,

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
            <Marker position={[31.54516572, -97.1155106
                ]}/>
            <Marker position={[31.54516572, -97.1152046
            ]}/>
            {isPosition && <IndoorMachine key={currentPosition.lat} current={currentPosition}/>}
        </MapContainer>
    );
}