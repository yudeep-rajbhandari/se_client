import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService"
import { Rings } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ListResource(){
const [resources, setResources] = useState([]);
const [loaded,setLoaded] = useState(false);


    async function getAllResource(){
        const {data} = await ResourceService.getAllResource();
        setResources(data)
        setLoaded(true)
        
    }

    useEffect(()=>{
        getAllResource()
        
    }
    , [])

    console.log(resources);

    if (loaded){
        return (<div>
            <h3> List Resource </h3>
            <div>
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Associated Rooom</TableCell>
                    <TableCell>Working Condition</TableCell>
                    <TableCell>Resource Type</TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.resourceName}</TableCell>
                      <TableCell>{row.room.name}</TableCell>
                      <TableCell>{row.workingCondition}</TableCell>
                      <TableCell>{row.resourceType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
        </div>)
    }
       if (!loaded){
        return (
            <div>
              <Rings
                align="center"
                height="80"
                width="80"
                color="#4fa94d"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          );
       }
    
    
}