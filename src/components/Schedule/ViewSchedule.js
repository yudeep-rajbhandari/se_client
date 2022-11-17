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
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import giphy from '../../resource/images/transparent.gif'
import {Rings} from "react-loader-spinner";

export default function ViewSchedule(props) {
  const [myLoader, setMyLoader] = useState(true);

  const [selectDate,setSelectDate] = useState([])
  const [schedule,setSchedule] = useState([])
  const [loading,setLoading] = useState(false)
  const [scheduleLoading,setscheduleLoading] = useState(true)
    useEffect(()=>{
      setMyLoader(false)
      const date= {
        selectedFromTime: new Date()
      }
      userService.getSchedule(date).then(res=>{
        setSchedule(res.data)
        setLoading(true)
        setMyLoader(true)
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })

    },[])

  const refreshIt1 = (date) => {
    setLoading(false)
    setMyLoader(false)
    setscheduleLoading(false)
    const date1= {
      selectedFromTime: date
    }
    console.log(date1)
    userService.getSchedule(date1).then(res=>{
      setSchedule(res.data)
      setscheduleLoading(true)
      setLoading(true)
      console.log(res.data)
      setMyLoader(true)
    }).catch(err=>{
      console.log(err)
    })

  }
  //
  // if(!scheduleLoading){
  //   return (<img src={giphy} alt="loading..." />)
  // }



  return(
<div>
<h1>Schedule</h1>
  <DatePicker
      onChange={(date) => refreshIt1(date)}

      minDate={new Date()}
      placeholderText="Select a day"

      // excludeDateIntervals={filterPassedTime()}
  />
  {!myLoader ?
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
      :<div>
      {schedule.length > 0 ? <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Room Id</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">From Date</TableCell>
                    <TableCell align="left">To Date</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row) => (
                      <TableRow
                          key={row.id}
                          sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          {row.room.name}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{moment(row.fromDate).format("MMMM D, YYYY hh:mm A")}</TableCell>
                        <TableCell align="left">{moment(row.toDate).format("MMMM D, YYYY hh:mm A")}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> :
            <div>No schedule found</div>
      }
      </div>
  }
</div>
  )



}
