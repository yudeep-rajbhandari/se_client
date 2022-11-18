import React, {useEffect, useState} from "react";

import userService from "../../services/user.service";

import DatePicker from "react-datepicker";
import moment from "moment/moment";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Rings} from "react-loader-spinner";

export default function ViewSchedule(props) {
  const [myLoader, setMyLoader] = useState(true);

  const [selectDate,setSelectDate] = useState(new Date())
  const [schedule,setSchedule] = useState([])
  const [loading,setLoading] = useState(false)
  const [scheduleLoading,setscheduleLoading] = useState(true)
    useEffect(()=>{
      setSelectDate(new Date())
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
    setSelectDate(date)
    setscheduleLoading(false)

    const date1 = {
      selectedFromTime: date
    }
    console.log(date1)
    userService.getSchedule(date1).then(res => {
      setSchedule(res.data)
      setscheduleLoading(true)
      setLoading(true)
      console.log(res.data)
      setMyLoader(true)
    }).catch(err => {
      console.log(err)
    })


  }

  return(
<div>
<h1>Schedule</h1>
  <DatePicker
      onChange={(date) => refreshIt1(date)}
      selected={selectDate}
      minDate={new Date()}
      dateFormat="MMMM d, yyyy"
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
                        <TableCell align="left">{moment(row.fromDate).format("hh:mm A")}</TableCell>
                        <TableCell align="left">{moment(row.toDate).format("hh:mm A")}</TableCell>
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
