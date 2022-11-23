import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './leaflet.css';


import RoutineMachine from "./routingmachine.component";
export default function LeafletComponent(){
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
        console.log("<<<<<<<<<<<",mypos)
        const latitude  = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        if(getRandomInt(2) ==0){

            console.log("inside 1")
            const currentPosition = {
                lat:  31.5097246,
                lng: -97.1442785
            }
            setCurrentPosition(currentPosition);

        }
        else {

            console.log("inside 2")
            const currentPosition = {
                lat:  31.5091393,
                lng: -97.1457555
            }

            setCurrentPosition(currentPosition);

        }

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
        <MapContainer center={[position.lat,position.lng]} zoom={12}scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {isPosition && <RoutineMachine key={currentPosition.lat} current={currentPosition}/>}
        </MapContainer>
    );
}