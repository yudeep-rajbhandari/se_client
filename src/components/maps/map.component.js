import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


export default function MapComponent(props) {
    const [map, setMap] = React.useState(null)
    const[lat,setLat] = useState(-3.745)
    const [long,setLong] = useState(-38.523)
    const[load,setLoad] = useState(false)

    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523,

    });

    const containerStyle = {
        width: '1024px',
        height: '768px'
    };


    useEffect(()=>{

            JsAPI()
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position:Geolocation)=>{
                    setCenter({lat:position.coords.latitude,lng:position.coords.longitude})
                });

                setLoad(true);
                console.log("get")
            }
            else {
                console.log("erroar")
            }
    },[])
const JsAPI=()=>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAuKGV3UkbzNWjoVbzjeAz0UhO9YPULZfE"
    })
}


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    if(load ) {


        return load ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        ) : <></>
    }
}