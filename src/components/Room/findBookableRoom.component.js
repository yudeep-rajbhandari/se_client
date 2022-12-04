import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import PublishIcon from '@mui/icons-material/Publish';
import Paper from "@mui/material/Paper";
import ReserveRoom from "../Reserve/ReserveRoom/reserve";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';
import giphy from "../../resource/images/transparent.gif";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import { Comment } from "react-loader-spinner";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider, List, ListItem, ListItemText, Slide,
  Toolbar, Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import {IconButton} from "@chakra-ui/react";
import userService from "../../services/user.service";

import { StyledTableCell, StyledTableRow } from "../../common/Style/Style";
import PrimaryButton from "../../common/Button/PrimaryButton";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FindBookableRoom(props) {
  const [open, setOpen] =useState(false);
  const [open1, setOpen1] =useState(false);

  const[selectedFromTime,setSelectedFromTime] = useState(new Date())
  const[selectedToTime,setSelectedToTime] = useState(new Date())
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (filter) => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (filter) => {
    setOpen1(false);
  };
  const [room, setRoom] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const [roomNumber, setRoomNumber] = useState(0);
  function createData(name: string, roomNumber: number, roomReservation: any) {
    return { name, roomNumber, roomReservation };
  }
  const notify1 = (childData) => {
    toast(childData);
  };
  const style = {
    marginRight: "auto",
    marginLeft: "auto",
    width: "800px",
  };
  const showChild1 = (childData) => {
    console.log("childData called");
    setShowChild(childData);
  };
  const refreshIt = (date)=>{
    setSelectedFromTime(date)
    setSelectedToTime(date)

  }

  const refreshIt1 = (date)=>{
    setSelectedToTime(date)

  }

  const getRoomByDate=()=>{
    setLoading(false)
   setOpen(false)
userService.getRoomBySchedule(selectedFromTime,selectedToTime).then(res=>{
  setRows(res.data);
  setLoading(true)
})
  }
  useEffect(() => {
    UserService.getAllBookableRoom().then((res) => {
      console.log("<<<<", res.data);
      setRows(res.data);
      setLoading(true);
    });
    console.log(">> ", rows);
  }, []);
  if (loading) {
    return (
      <div>
        <ToastContainer />

        <div>
          <PrimaryButton title = "Filter By Time" icon = {<FilterAltIcon />} onClick={handleClickOpen}/>
        
          <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
          >
            <AppBar style ={{backgroundColor: "#154734", color: "#FFB81C"}} sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Select Date
                </Typography>
                <PrimaryButton title = "Submit" icon = {<PublishIcon />} onClick={handleClose}/>
              
              </Toolbar>
            </AppBar>
            From date:
            <DatePicker
                onChange={(date) => refreshIt(date)}
                selected = {selectedFromTime}
                showTimeSelect
                // excludeDateIntervals={filterPassedTime()}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            To Date:
            <DatePicker
                onChange={(date) => refreshIt1(date)}
                selected = {selectedToTime}
                minDate={new Date()}
                placeholderText="Select a day"

                showTimeSelect
                // excludeDateIntervals={filterPassedTime()}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            <div>
            <PrimaryButton title ="Submit" icon={<PublishIcon />} onClick={()=>getRoomByDate()} />
            </div>
            

          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">id</StyledTableCell>
                <StyledTableCell align="left">Reserve</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    <PrimaryButton title = "Reserve"
                    icon = {<EventSeatIcon />}
                      onClick={() => {
                        setShowChild(true);
                        setRoom(row);
                        handleClickOpen1();
                      }}
                    />
                   
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showChild && (
            <div>
              <Dialog
                  fullScreen
                  open={open1}
                  onClose={handleClose1}
                  TransitionComponent={Transition}
              >
                <AppBar style ={{backgroundColor: "#154734", color: "#FB81C"}} sx={{ position: 'relative' }}>
                  <Toolbar>
                    <IconButton
                        edge="start"
                       style ={{backgroundColor: "#154734", color: "#FFB81C"}}
                        onClick={handleClose1}
                        aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography style ={{backgroundColor: "#154734", color: "#FFB81C"}}sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                      Select Date
                    </Typography>
                  </Toolbar>

                </AppBar>
                <ReserveRoom notify1={notify1} showChild1={showChild1} room={room} />
              </Dialog>
            </div>

        )}
      </div>
    );
  } else {
    return (
      <div style={style}>
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
      </div>
    );
  }
}
