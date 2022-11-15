import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import moment from "moment";
import UserService from "../../../services/user.service";

import giphy from '../../../resource/images/transparent.gif'

import {ToastContainer, toast} from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import userService from "../../../services/user.service";

// toast-configuration method,
// it is compulsory method.


export default function ReserveRoom(props) {
    const[loading,setLoading] = useState(false)
    const[selectedFromTime,setSelectedFromTime] = useState(new Date())
    const[selectedToTime,setSelectedToTime] = useState(new Date())



    const[slots,setSlots] = useState([])
    //
    useEffect(() => {
        console.log(props)
        UserService.getRoom(props.room.id).then(res => {
            console.log(res.data)
            setSlots(res.data.roomReservation.map(i=>({
                start: new Date(i.fromDate),
                end: new Date(i.toDate)
            })))
            setLoading(true)

        })
        console.log("booking",slots)
    },[props.room.id]);


    const refreshIt = (date)=>{
        setSelectedFromTime(date)
        setSelectedToTime(date)

    }

    const refreshIt1 = (date)=>{
        setSelectedToTime(date)

    }
    const handleSubmit = () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const newbook = {
            fromDate: new Date(selectedFromTime),
            toDate: new Date(selectedToTime),
            bookedBy:user.id
        }
        console.log("post", newbook)


        console.log("reservationData",newbook)

        userService.makeReservation(props.room.roomNumber, newbook).then(res=>{
            props.notify1("Reservation applied for room"+ res.data.roomId)
        }).catch(err=>{
            props.notify1("Something went wrong");
        })

        props.showChild1(false);

    };
    const filterPassedTime = (time) =>{

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
    const disabledDateRanges = slots.map(range => ({
        start: range.start,
        end: range.end
    }));
    useEffect(()=>{
        console.log("abc",slots)
    })
    // return (
    //     <DatePicker showTimeSelect filterTime={disabledDateRanges} />
    // );

    if(loading) {
        return (
            <div>
                Room Reservation for room {props.room.name}
                <div>   <button onClick={()=>{props.showChild1(false)}}>Close</button></div>

                From date:
                <DatePicker
                    onChange={(date) => refreshIt(date)}
                    selected = {selectedFromTime}
                    showTimeSelect
                    // excludeDateIntervals={filterPassedTime()}
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                To Date:
                <DatePicker
                    onChange={(date) => refreshIt1(date)}
                    selected = {selectedToTime}
                    showTimeSelect
                    // excludeDateIntervals={filterPassedTime()}
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>


        );
    }
    else{
        return(
            <img src={giphy} alt="loading..." />
        )
    }
}
