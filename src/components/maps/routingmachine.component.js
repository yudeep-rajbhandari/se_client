import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet"
import {useEffect, useState} from "react";

const CreateRoutineMachineLayer = (props) => {

console.log("<<<<<")
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(props.current.lat,props.current.lng),
            L.latLng(31.4969367,-97.1929281),

        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine  =
    createControlComponent(CreateRoutineMachineLayer);


export default RoutingMachine;
