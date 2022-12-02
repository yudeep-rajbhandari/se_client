import "./newParent.css"
import {useEffect, useState} from "react";
import LeafletComponent from "./leaflet.component";
import LeafletComponent1 from "./indoornew.component";
import L from "leaflet";
import {Button, Modal} from "@mui/material";
import {Box} from "@mui/system";
import outline from "./paths/buildingOutline"
import allPaths from "./paths/paths"

let json = require('./sample.json');

export default function MapParentComponent(props){

    const [building,setBuilding] = useState(false)
    const [elevator,setElevator] = useState(false)
    const [room,setRoom] = useState(false)
    const [gate,setGate] = useState({})
    const [currentPosition,setCurrentPosition] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [inside,setInside] = useState(false)
    const[path,setPath] = useState("")
    const roomName = '308'
    function success(pos) {
        const latitude  = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const currentPosition = {
            lat:  latitude,
            lng: longitude
        }
        setCurrentPosition(currentPosition);

    }
    function getDistance(){
        // console.log("direction",props.room.building.gate)
        var fromLatLng = L.latLng([currentPosition.lat,currentPosition.lng]);
        var dis = 111111111111111111111
        var j = props.room.building.gate;
        var gate = {}
        j.forEach(p=>{

            var newDist = fromLatLng.distanceTo([p.latitude, p.longitude]);
            console.log("<<<<<<<<<",newDist)
            if(newDist < dis){
                dis = newDist
                setGate(p)
                console.log(p)
            }
        })

    }

    function getRoomPath(){
        var fromLatLng = L.latLng([currentPosition.lat,currentPosition.lng]);
        var dis = 111111111111111111111
        const filteredAllPath = allPaths.filter(j=> j.properties.name.split("_")[1] === props.room.name)
        filteredAllPath.forEach(p=>{

            var newDist = fromLatLng.distanceTo([p.geometry.coordinates[0][1], p.geometry.coordinates[0][1]]);
            if(newDist < dis){
                dis = newDist
                setPath(p.properties.name)
            }
        })

    }

    const getCurrentLocation= ()=>{

        navigator.geolocation.getCurrentPosition(success);
    }
    function isMarkerInsidePolygon(marker, poly) {
        var polyPoints = poly.getLatLngs();
        var x = marker.lat, y = marker.lng;

        var inside = false;
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    function getBuildingPolygon() {
        const aa = [];
        outline.geometry.coordinates.forEach(j=>{
            aa.push(new L.LatLng(j[1],j[0]))
        })

        var firstpolyline = new L.Polyline(aa)
        return isMarkerInsidePolygon(currentPosition,firstpolyline)
    }
    useEffect(()=>{
        getCurrentLocation();
    },[])

    useEffect(()=>{
        if(Object.keys(currentPosition).length !== 0){
           getDistance()
        }

        if(getBuildingPolygon()){

            let confirmAction = window.confirm("Are you inside the building?");
            if (confirmAction) {

                setInside(true)
            } else {
                setInside(false)
            }

        }
        else {
            console.log("<<<< I am outside")
        }

    },[currentPosition.lng])

    // function getElevatorPath(gate) {
    //     const filteredAllPath = allPaths.filter(j=> j.properties.name === gate.elevatorName+'_'+roomName)
    // }

    useEffect(()=>{
        if(inside===true){
            getRoomPath()
        }
        else {
            setPath(gate.elevator+'_'+props.room.name)
        }
    },[inside,gate])
    function clicker(aa){
        console.log(aa)
        if (aa === 'building') {
            setBuilding(true)
            setRoom(false)
            setElevator(false)
        } else if (aa === 'room') {
            setBuilding(false)
            setRoom(true)
            setElevator(false)
        } else {
            getDistance()
            setBuilding(false)
            setRoom(false)
            setElevator(true)
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return(
        <div>
        <div className="container padding-bottom-3x mb-1">
            <div className="card mb-3">

                <div className="card-body">
                    <div
                        className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                        { !inside && <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/ios-filled/50/null/city.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("building")}>Get to the building <br/>towards  {gate.name}</a>
                           <br/> Look for<Button onClick={handleOpen}>this sign</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}>
                                    <img src={"images/"+gate.name+".jpg"}  width="600" height="800"/>
                                </Box>
                            </Modal>
                        </div> }
                        { !inside && <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/ios-filled/50/null/elevator-doors.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("elevator")}>Take the  {gate.elevator} and go to Floor {props.room.floor}</a>
                            <br/> Look for<Button onClick={handleOpen1}>this sign</Button>

                            <Modal
                                open={open1}
                                onClose={handleClose1}

                            >
                                <Box sx={style}>
                                    <img src={"images/"+gate.elevator+".jpg"}  width="500" height="600"/>
                                </Box>
                            </Modal>
                        </div>}
                        <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/glyph-neue/64/null/room.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("room")}>Go to room</a>
                            <br/> Look for<Button onClick={handleOpen2}>this sign</Button>

                            <Modal
                                open={open2}
                                onClose={handleClose2}
                            >
                                <Box sx={style}>
                                    <img src={gate.pic}  width="500" height="600" alt ="not available currently"/>
                                </Box>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </div>

            {building ? <div><LeafletComponent gate={gate}/> </div>:null}
            {room ? <div><LeafletComponent1 path = {path}/> </div>:null}

        </div>
    )
}