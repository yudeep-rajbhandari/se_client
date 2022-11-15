import React, {useEffect, useState} from "react";

import userService from "../../../services/user.service";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ToastContainer, toast} from 'react-toastify';
import giphy from '../../../resource/images/transparent.gif'
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

export default function MyReserveRoomComponent(props) {

    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        userService.getMyReservation(user.id).then(res=>{
            setReservation(res.data);
            console.log(res.data)
            setLoading(true)
        })
    },[]);
    if(loading){
        return (

            <div>
                <ToastContainer/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Room Id</TableCell>
                                <TableCell align="left">status</TableCell>
                                <TableCell align="left">From Data</TableCell>
                                <TableCell align="left">To Data</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservation.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.roomId}
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="left">{moment(row.fromDate).format("MMMM D, YYYY hh:mm A")}</TableCell>
                                    <TableCell align="left">{moment(row.toDate).format("MMMM D, YYYY hh:mm A")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*{showChild && <ReserveRoom notify1 = {notify1} showChild1={showChild1} room={room}/>}*/}


            </div>
        );
    } else{
        return(
            <img src={giphy} alt="loading..." />
        )
    }


}
