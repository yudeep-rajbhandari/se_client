

import Wrld from "wrld.js";
import {useEffect, useState} from "react";
import L from "leaflet";
import "./test.js";

export default function EggComponent() {
    const[map,setMap] = useState()

    useEffect(()=>{
        setMap(Wrld.map("map1", "7a5636b364bea41d6e8d1bbf9e08d3a2"), {
                center: [37.780813, -122.404750],
                zoom: 44
        });

    },[])



    return(
        <div id="map1" style={{height:'1000px'}}></div>

    )
}