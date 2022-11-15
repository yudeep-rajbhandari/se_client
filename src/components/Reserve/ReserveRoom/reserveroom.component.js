import React, { useState, useEffect, useMemo } from "react";
import UserService from "../../../services/user.service";
import {
  AvailabilityCalendar,
  AvailabilityEvent,
  MsSinceMidnightRange,
  Range,
} from "react-availability-calendar";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import userService from "../../../services/user.service";
import { ToastContainer, toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.


export default function ReserveRoom1(props) {
    console.log("ussss",props.roomNumber)
    const [bookings, setBookings] = useState([]);
    const providerTimeZone = 'America/Chicago';
    const msInHour = 60 * 60 * 1000;
    const now = new Date();
    const [selectedAvails, setSelectedAvails] = useState([]);
    const [bookingnow, setBookingnow] = useState([]);
    const [lastSelectedDay, setLastSelectedDay] = useState(new Date());
    const[loading,setLoading] = useState(false)
    const overrides = {
        AvailSlot: {
            className: (p) =>
                selectedAvails[p.date.getTime()]
                    ? 'btn btn-secondary'
                    : 'btn btn-primary',
        },
    }
  };
  const handleRemove = () => {
    setLoading(true);
    console.log("post", bookingnow);
    const newbook = [
      {
        fromDate: new Date(bookingnow[0].startDate),
        toDate: new Date(bookingnow[bookingnow.length - 1].startDate),
      },
    ];
    console.log("post", newbook);
    userService.makeReservation(props.roomNumber, newbook);
    notify("Success");
  };
  const onAvailabilitySelected = (a: AvailabilityEvent) => {
    if (
      bookingnow.filter((e) => e.startDate.getTime() === a.startDate.getTime())
        .length > 0
    ) {
      const newPeople = bookingnow.filter(
        (person) => person.startDate.getTime() !== a.startDate.getTime()
      );
      console.log("erere", newPeople);
      bookingnow.length = 0;
      newPeople.forEach((j) => {
        bookingnow.push(j);
      });
    } else {
      bookingnow.push(a);
    }
    console.log("Availability slot selected!: ", a);
    const startMs = a.startDate.getTime();
    const wasSelected = !!selectedAvails[startMs];
    setSelectedAvails((selectedAvails) => ({
      ...selectedAvails,
      [startMs]: wasSelected ? null : a,
    }));
    console.log("<<<<", bookingnow);
  };

  const onChangedCalRange = (r: Range) =>
    console.log("Calendar range selected (fetch bookings here): ", r);

  const blockOutPeriods: MsSinceMidnightRange[] = [
    [0 * msInHour, 10 * msInHour],
    [19 * msInHour, 24 * msInHour],
  ];
  useEffect(() => {
    UserService.getRoom(props.roomNumber).then((res) => {
      console.log(res.data);
      setBookings(
        res.data.roomReservation.map((i) => ({
          startDate: new Date(i.fromDate),
          endDate: new Date(i.toDate),
        }))
      );
    });
    console.log("booking", bookings);
  }, []);
  return (
    <div style={{ width: 350 }}>
      <h1>booking for {props.roomNumber}</h1>
      <AvailabilityCalendar
        overrides={overrides}
        bookings={bookings}
        providerTimeZone={providerTimeZone}
        moment={moment}
        initialDate={lastSelectedDay}
        onDaySelected={onDaySelected}
        onAvailabilitySelected={onAvailabilitySelected}
        onCalRangeChange={onChangedCalRange}
        blockOutPeriods={blockOutPeriods}
      />
      <div>
        <button onClick={handleRemove}>Submit</button>
        <ToastContainer />
      </div>
    </div>
  );
}
