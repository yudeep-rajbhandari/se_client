import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import CloseIcon from '@mui/icons-material/Close';
import "react-datepicker/dist/react-datepicker.css";
import PublishIcon from '@mui/icons-material/Publish';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './custom.scss';
import moment from "moment";
import UserService from "../../../services/user.service";

import giphy from '../../../resource/images/transparent.gif'

import {ToastContainer, toast} from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import userService from "../../../services/user.service";
import { Button } from "@mui/material";
import { ButtonSpinner } from "@chakra-ui/react";
import PrimaryButton from "../../../common/Button/PrimaryButton";
import { Close } from "@mui/icons-material";
import resourceService from "../../../services/ResourceService";

// toast-configuration method,
// it is compulsory method.


export default function ReserveResourcePicker(props) {
    const[loading,setLoading] = useState(false)
    const[selectedFromTime,setSelectedFromTime] = useState(new Date())
    const[selectedToTime,setSelectedToTime] = useState(new Date())



    const[slots,setSlots] = useState([])


    //
    useEffect(() => {

        resourceService.getResourceById(props.resource).then(res => {
            console.log("resource all",res.data)
            setSlots(res.data.resourceReservations.map(i=>({
                start: new Date(i.fromDate),
                end: new Date(i.toDate)
            })))
            setLoading(true)

        })
        console.log("booking",slots)
    },[props.resource]);


    const refreshFromDate = (date)=>{
        setSelectedFromTime(date)
        setSelectedToTime(date)

    }

    const refreshToDate = (date)=>{
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

        userService.reserveResource(props.resource, newbook).then(res=>{
            props.notify1("Reservation applied for resource "+ res.data.id)
        }).catch(err=>{
            console.log(err)
            props.notify1(err.response.data.message);
        })

        props.showChild1(false);
        props.open();

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
                Resource Reservation for resource {props.resource}
                <div>   <PrimaryButton title= "Close"  icon = {<CloseIcon />} onClick={()=>{props.showChild1(false)}}/></div>

                From date:
                <DatePicker
                    onChange={(date) => refreshFromDate(date)}
                    selected = {selectedFromTime}
                    showTimeSelect
                    // excludeDateIntervals={filterPassedTime()}
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                To Date:
                <DatePicker
                    onChange={(date) => refreshToDate(date)}
                    selected = {selectedToTime}
                    minDate={new Date()}
                    placeholderText="Select a day"

                    showTimeSelect
                    // excludeDateIntervals={filterPassedTime()}
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <PrimaryButton title = "Submit" icon = {<PublishIcon />}onClick={handleSubmit}/>
            </div>


        );
    }
    else{
        return(
            <img src={giphy} alt="loading..." />
        )
    }
}
