import "./newParent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import LeafletComponent from "./leaflet.component";
import LeafletComponent1 from "./indoornew.component";

export default function MapParentComponent(){
    const [building,setBuilding] = useState(false)
    const [elevator,setElevator] = useState(false)
    const [room,setRoom] = useState(false)


    function clicker(aa){
        console.log(aa)
if(aa==='building'){
    setBuilding(true)
    setRoom(false)
    setElevator(false)
}
else if(aa==='room'){
    setBuilding(false)
    setRoom(true)
    setElevator(false)
}
else{
    setBuilding(false)
    setRoom(false)
    setElevator(true)
}
    }

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
                            <a className="step-title" onClick={ () => clicker("building")}>Get to the building</a>
                        </div>
                        <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/ios-filled/50/null/elevator-doors.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("elevator")}>Take the elevator</a>
                        </div>
                        <div className="step completed">
                            <div className="step-icon-wrap">
                                <div className="step-icon"><img src="https://img.icons8.com/glyph-neue/64/null/room.png" /></div>
                            </div>
                            <a className="step-title" onClick={ () => clicker("room")}>Go to room</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

            {building ? <div><LeafletComponent/> </div>:null}
            {room ? <div><LeafletComponent1/> </div>:null}

        </div>
    )
}