import { TableBody, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function ResourceDashboardTable(props) {
    return (<div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell># Resource</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Tooltip
                                disableFocusListener
                                disableTouchListener

                                title="click to view list of resources"
                            >
                                <Button
                                    onClick={(event) =>
                                        (window.location.href = "/listResource")
                                    }
                                >
                                    {props.resources.length}
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}