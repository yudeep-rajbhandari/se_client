import "./newParent.css"
import {useEffect, useState} from "react";
import LeafletComponent from "./leaflet.component";
import LeafletComponent1 from "./indoornew.component";
import L from "leaflet";
import {Button, Modal, Typography} from "@mui/material";
import {ModalContent} from "@chakra-ui/react";
import {Box} from "@mui/system";
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
    function success(pos) {
        console.log("<<<<<<<<<<<",pos)
        const latitude  = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const currentPosition = {
            lat:  latitude,
            lng: longitude
        }
        setCurrentPosition(currentPosition);

    }
    function getDistance(){
        var fromLatLng = L.latLng([currentPosition.lat,currentPosition.lng]);
        var dis = 111111111111111111111
        var j = json.building.gates;
        var gate = {}
        j.forEach(p=>{

            var newDist = fromLatLng.distanceTo([p.lat, p.lng]);
            console.log("<<<<<<<<<",newDist)
            if(newDist < dis){
                dis = newDist
                setGate(p)
                console.log(dis)
            }
        })


    }

    const getCurrentLocation= ()=>{

        navigator.geolocation.getCurrentPosition(success);
    }

    useEffect(()=>{
        getCurrentLocation();
    },[])

    useEffect(()=>{
        if(Object.keys(currentPosition).length !== 0){
           getDistance()

        }



    },[currentPosition.lng])
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
                        <div className="step completed">
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
                                    <img src={gate.pic}  width="500" height="600"/>
                                </Box>
                            </Modal>
                        </div>
                        <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/ios-filled/50/null/elevator-doors.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("elevator")}>Take the  {gate.elevatorName}</a>
                            <br/> Look for<Button onClick={handleOpen1}>this sign</Button>

                            <Modal
                                open={open1}
                                onClose={handleClose1}

                            >
                                <Box sx={style}>
                                    <img src={gate.elevatorpic}  width="500" height="600"/>
                                </Box>
                            </Modal>
                        </div>
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
                                    <img src={gate.pic}  width="500" height="600"/>
                                </Box>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </div>

            {building ? <div><LeafletComponent gate={gate}/> </div>:null}
            {room ? <div><LeafletComponent1/> </div>:null}

        </div>
    )
}