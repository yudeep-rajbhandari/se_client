import React, { useEffect, useState } from "react";

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
import { Comment } from "react-loader-spinner";
import Button from "@mui/material/Button";
import BikeScooterIcon from "@mui/icons-material/BikeScooter";
import roomService from "../../services/RoomService";
import MapParentComponent from "../maps/mapParent.component";
import { primaryHeader } from "../../common/Style/Style";
export default function ViewSchedule(props) {
  const [myLoader, setMyLoader] = useState(true);

  const [selectDate, setSelectDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const [scheduleLoading, setscheduleLoading] = useState(true);
  const [showParent, setShowParent] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState();
  useEffect(() => {
    setSelectDate(new Date());
    setMyLoader(false);

    const date = {
      selectedFromTime: new Date(),
    };
    userService
      .getSchedule(date)
      .then((res) => {
        setSchedule(res.data);
        setLoading(true);
        setMyLoader(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshIt1 = (date) => {
    setLoading(false);
    setMyLoader(false);
    setSelectDate(date);
    setscheduleLoading(false);

    const date1 = {
      selectedFromTime: date,
    };
    console.log(date1);
    userService
      .getSchedule(date1)
      .then((res) => {
        setSchedule(res.data);
        setscheduleLoading(true);
        setLoading(true);
        console.log(res.data);
        setMyLoader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function showDirection(name) {
    roomService.getRoomByName(name).then((res) => {
      setSelectedRoom(res.data);
      setIsSelectedRoom(true);
      setShowParent(false);
    });
  }

  return (
    <div>
      {isSelectedRoom && <MapParentComponent room={selectedRoom} />}
      {showParent && (
        <div>
          <h1 style={primaryHeader}>Schedule</h1>
          <DatePicker
            onChange={(date) => refreshIt1(date)}
            selected={selectDate}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
          {!myLoader ? (
            <Comment
              visible={true}
              height="80"
              width="80"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#FFB81C"
              backgroundColor="#154734"
            />
          ) : (
            <div>
              {schedule.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Room Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">From Date</TableCell>
                        <TableCell align="left">To Date</TableCell>
                        <TableCell align="left">Direction</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.room.name}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            {moment(row.fromDate).format("hh:mm A")}
                          </TableCell>
                          <TableCell align="left">
                            {moment(row.toDate).format("hh:mm A")}
                          </TableCell>
                          <TableCell>
                            <Button
                              startIcon={<BikeScooterIcon />}
                              variant="outlined"
                              aria-label="text button group"
                              onClick={() => showDirection(row.room.name)}
                            >
                              {" "}
                              DIRECTION
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div>No schedule found</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
