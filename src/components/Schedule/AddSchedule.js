import React, {useEffect, useRef, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import UserService from "../../services/user.service";
import {toast} from "react-toastify";
import adminService from "../../services/admin.service";
import InputLabel from '@mui/material/InputLabel';

import DatePicker from "react-datepicker";
import moment from "moment/moment";
import BuildingService from "../../services/BuildingService";
import userService from "../../services/user.service";
import giphy from '../../resource/images/transparent.gif';
import { Rings } from 'react-loader-spinner'


export default function AddSchedule(props) {
    const [selectedFromTime, setSelectedFromTime] = useState(new Date())
    const [selectedToTime, setSelectedToTime] = useState(new Date())
    const [loaded, setLoaded] = useState(false);
    const [roomloaded, setRoomloaded] = useState(false);
    const [myLoader, setMyLoader] = useState(true);
    const [custom, setCustom] = useState([]);
    const [customLoaded, setCustomLoaded] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [selectedFrequency, setselectedFrequency] = useState({});
    const [buildings, setBuildings] = useState([]);
    const [room, setRoom] = useState([]);

    const nameRef = useRef();

    async function getAllBuilding() {
        const {data} = await BuildingService.getAllBuilding();
        console.log("building", data)
        setBuildings(data);
    }

    useEffect(() => {
        getAllBuilding();
        setLoaded(true);
    }, []);

    const options = buildings.map((building) => (
        <option key={building.id} value={building.id}>
            {building.name}
        </option>


));
    const [slots, setSlots] = useState([])

    const refreshIt = (date) => {
        console.log("aaaaa",date)
        setSelectedFromTime(date)
        setSelectedToTime(date)

    }
    const options1 = room.map((room) => (

        <option key={room.id} value={room.id}>
            {room.name}
        </option>
    ));

    function handleSelectedBuildingIdChange(event) {
        setMyLoader(false)
        console.log(event.target.value)
        userService.getAllClassRoom(event.target.value).then(res => {
            console.log(res.data)
            setRoom(res.data)
            setMyLoader(true)
            setRoomloaded(true)

        })

    }

    function handleSelectedRoomIdChange(event) {
        setSelectedRoom(event.target.value)
    }

    function handleRepeat(event) {
        setselectedFrequency(event.target.value)
        console.log("frequency", event.target.value)

        if (event.target.value === "Custom") {
            setCustomLoaded(true)
        } else {
            setCustomLoaded(false)
            setCustom({})

        }
    }

    const handleChangeNormalSelect = e => {
        const updatedOptions = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
        console.log("updatedOptions", updatedOptions);
        setCustom(updatedOptions)
    };

    const refreshIt1 = (date) => {
        setSelectedToTime(date)

    }
    const handleChange = (room) => {
        console.log(room.target)

    }

    const handleSubmit = () => {

        const schedule = {
            "roomId": selectedRoom,
            "selectedFrequency": selectedFrequency,
            "custom": custom,
            "selectedFromTime": selectedFromTime,
            "selectedToTime": selectedToTime ,
            "name": nameRef.current.value
        }
        console.log(schedule)
        adminService.addBulkSchedule(schedule).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.error(err)
        })
    }
    const filterPassedTime = (time) => {

        for (let i = 0; i < slots.length; i++) {
            const e = slots[i];

            var x = moment(time),
                beforeTime = moment(e.start),
                afterTime = moment(e.end);

            if (
                x.isBetween(beforeTime, afterTime) ||
                x.isSame(moment(beforeTime)) ||
                x.isSame(moment(afterTime))
            ) {
                return false;
            }
            if (i + 1 == slots.length) {
                return true;
            }
        }
        return true;
    }


    if (loaded) {

        return (<div>
                <label htmlFor="buildings">
                    Associated Building
                    <select onChange={handleSelectedBuildingIdChange} placeholder="select Building">
                        <option value="" disabled selected hidden>Choose a Building</option>
                        {options}
                    </select>
                </label>

                {!myLoader?
                    <Rings
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                    />
                    :null}

                {options1.length > 0 ? <div>

                        <label htmlFor="name"> Name</label>
                        <input ref={nameRef} type="name" id="name" required />
                        <label htmlFor="rooms">
                            Associated Rooms
                            <select onChange={handleSelectedRoomIdChange}>
                                <option value="" disabled selected hidden>Choose a Room</option>

                                {options1}
                            </select>
                        </label>

                        From date:
                        <DatePicker
                            onChange={(date) => refreshIt(date)}
                            selected={selectedFromTime}
                            showTimeSelect
                            // excludeDateIntervals={filterPassedTime()}
                            filterTime={filterPassedTime}
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />


                        To Date:
                        <DatePicker
                            onChange={(date) => refreshIt1(date)}
                            selected={selectedToTime}
                            minDate={new Date()}
                          v

                            showTimeSelect
                            // excludeDateIntervals={filterPassedTime()}
                            filterTime={filterPassedTime}
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />

                        <label htmlFor="rooms">
                            Frequency
                            <select onChange={handleRepeat}>
                                <option value="Once">Once</option>
                                <option value="Repeat">Repeat daily</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </label>
                        {customLoaded ? <label htmlFor="rooms">
                            Frequency
                            <select data-placeholder="Begin typing a name to filter..." onChange={handleChangeNormalSelect} multiple>
                                <option value="M">Monday</option>
                                <option value="T">Tuesday</option>
                                <option value="W">Wednesday</option>
                                <option value="TR">Thursday</option>
                                <option value="F">Friday</option>
                            </select>
                        </label> : null}
                    <button onClick={handleSubmit}>Submit</button>
                    </div>

                    : <p>No rooms found</p>}
            </div>

        )
    }
}
