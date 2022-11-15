import React, {useEffect, useState} from "react";

import UserService from "../../services/user.service";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReserveRoom from "../Reserve/ReserveRoom/reserveroom.component";

export default function FindBookableRoom(props) {

    const [room, setRoom] = useState([]);
    const [rows, setRows] = useState([]);
    const[loading,setLoading] = useState(false);
    const [showChild, setShowChild] = useState(false);
    const [roomNumber, setRoomNumber] = useState(0);
    function createData(
        name: string,
        roomNumber: number,

    ) {
        return { name, roomNumber };
    }

    useEffect(() => {
        UserService.getAllBookableRoom().then(res => {
            console.log("<<<<",res.data)
            res.data.forEach(j=>{
                rows.push(createData(j.name,j.id))
            })
            setLoading(true)

        })
        console.log(">> ",rows)
    },[]);
if(loading){
    return (
        <div>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">id</TableCell>
                        <TableCell align="left">Reserve</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.roomNumber}</TableCell>
                            <TableCell align="left">
                                <button onClick={() => {
                                    setShowChild(true)
                                    setRoomNumber(row.roomNumber)
                                }

                                }>Reserve</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            {showChild && <ReserveRoom roomNumber={roomNumber}/>}

        </div>
    );
}


}
