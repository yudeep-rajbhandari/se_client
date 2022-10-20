import React, { useState, useEffect,useMemo } from 'react';
import UserService from "../../../services/user.service";
import {
    AvailabilityCalendar,
    AvailabilityEvent,
    MsSinceMidnightRange,
    Booking,
    Range,
    CalendarThemeProp,
} from 'react-availability-calendar';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import userService from "../../../services/user.service";

export default function ReserveRoom(props) {
    const [bookings, setBookings] = useState([]);
    const providerTimeZone = 'America/Chicago';
    const msInHour = 60 * 60 * 1000;
    const now = new Date();
    const [selectedAvails, setSelectedAvails] = useState([]);
    const [bookingnow, setBookingnow] = useState([]);
    const overrides = {
        AvailSlot: {
            className: (p) =>
                selectedAvails[p.date.getTime()]
                    ? 'btn btn-secondary'
                    : 'btn btn-primary',
        },
    }
    const handleRemove = () => {
        console.log("post",bookingnow)
        const newbook=[{
            fromDate: new Date(bookingnow[0].startDate),
            toDate: new Date(bookingnow[bookingnow.length-1].startDate)
        }]
        console.log("post",newbook)
        userService.makeReservation(2,newbook)
    };
    const onAvailabilitySelected = (a: AvailabilityEvent) => {

        if(bookingnow.filter(e=>e.startDate.getTime() === a.startDate.getTime()).length>0){

            const newPeople = bookingnow.filter((person) => person.startDate.getTime() !== a.startDate.getTime());
            console.log("erere",newPeople)
            bookingnow.length =0
            newPeople.forEach(j=>{
                bookingnow.push(j)
            })
        }
        else{
            bookingnow.push(a)
        }
        console.log('Availability slot selected!: ', a);
        const startMs = a.startDate.getTime();
        const wasSelected = !!selectedAvails[startMs];
        setSelectedAvails((selectedAvails) => ({
            ...selectedAvails,
            [startMs]: wasSelected ? null : a,
        }));
        console.log("<<<<",bookingnow)
    };

    const onChangedCalRange = (r: Range) =>
        console.log('Calendar range selected (fetch bookings here): ', r);

    const blockOutPeriods: MsSinceMidnightRange[] = [
        [0 * msInHour, 10 * msInHour],
        [19 * msInHour, 24 * msInHour],
    ];
    useEffect(() => {
        UserService.getRoom(2).then(res => {
            console.log(res.data)
            setBookings(res.data.roomReservation.map(i=>({
                startDate: new Date(i.fromDate),
                endDate: new Date(i.toDate)
            })))

        })
    },[]);
    return (
        <div style={{ width: 350 }}>
            <AvailabilityCalendar
                overrides={overrides}
                bookings={bookings}
                providerTimeZone={providerTimeZone}
                moment={moment}
                initialDate={now}
                onAvailabilitySelected={onAvailabilitySelected}
                onCalRangeChange={onChangedCalRange}
                blockOutPeriods={blockOutPeriods}
            />
            <div>
                <button onClick={handleRemove}>Submit</button>
            </div>
        </div>

    );
}