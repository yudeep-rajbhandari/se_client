import React, { useState, useEffect, useRef } from 'react';
import {GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import {Button} from "@mui/material";

const MapContainer = ({ array, isAdding, getLocation }) => {

    const [ selected, setSelected ] = useState({});
    const [ currentPosition, setCurrentPosition ] = useState({});
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const markerRef = useRef(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    const onSelect = item => {
        setSelected(item);
    }

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentPosition = {
            lat: latitude,
            lng: longitude
        }
        setCurrentPosition(currentPosition);
    }

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng})
    };
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAuKGV3UkbzNWjoVbzjeAz0UhO9YPULZfE',
        libraries: ['places'],
    })
    const footer = (
        <div className="footer">
            <div className="inner-footer">
                <span className="location-text">Choose location and press</span>
                <Button variant="contained" color="primary" onClick={() => getLocation(currentPosition)}>
                    Next
                </Button>
            </div>
        </div>
    );

    const mapStyles = () => {
        if (!isAdding) {
            return {
                marginTop: "-20px",
                height: "100vh",
                width: "100%"
            }
        } else {
            return {
                marginTop: "-20px",
                height: "80vh",
                width: "100%"
            }
        }
    }
     async function calculateRoute(){
        //
        const google = window.google;
        // console.log(google)

             const directionService = new google.maps.DirectionsService();




        const results =  directionService.route({
            origin: new google.maps.LatLng(31.5451836, -97.1174557),
            destination: currentPosition,
            travelMode: google.maps.TravelMode.WALKING
        })

         results.then(res=>{
             setDirectionsResponse(res)
         })


    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        calculateRoute();

    },[])

    return (
        <>
            <div>
                <button onClick={calculateRoute}>Calculate</button>
            </div>
            {isLoaded?
                <GoogleMap
                    id='example-map'
                    mapContainerStyle={mapStyles()}
                    draggable={true}
                    zoom={13}
                    center={currentPosition.lat ? currentPosition : defaultCenter}
                >
                    {
                        array ?
                            array.map(item => {
                                return (
                                    <Marker
                                        key={item.id}
                                        position={item.location}
                                        onClick={() => onSelect(item)}
                                    />
                                )
                            }) : null
                    }
                    {
                        isAdding ?
                            <Marker
                                position={currentPosition}
                                ref={() => markerRef}
                                onDragEnd={(e) => onMarkerDragEnd(e)}
                                draggable={true} /> :
                            null
                    }
                    {
                        selected.location ?
                            (
                                <InfoWindow
                                    position={selected.location}
                                    onCloseClick={() => setSelected({})}
                                >
                                    <div className="infowindow">
                                        <p>{selected.title}</p>
                                        <img src={selected.image} className="small-image" alt="rental"/>
                                        <p>price: {selected.price}</p>
                                        <p>sqm2: {selected.sqm}</p>
                                        <p>bedrooms: {selected.bedrooms}</p>
                                    </div>
                                </InfoWindow>
                            ) : null
                    }

                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
                :null}
        </>
    )
}

export default MapContainer;