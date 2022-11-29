
import RoomDashboardTable from "./RoomDashboardTable";

import React, { useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import BookableTable from "./BookableTable";



export default function RoomDashboard(props) {
  const [bookable, setBookable] = useState(false);
  function showBookable() {
    setBookable(true);


  }
  function hideTable() {
    setBookable(false);

  }
  return (
    <div>
      <RoomDashboardTable rooms={props.rooms} />
      <div >
        <ButtonGroup variant="text" aria-label="text button group">
          {!bookable && <Button variant="text" onClick={() => showBookable()}>
            Bookable
          </Button>}
          {bookable && <Button color="error" variant="text" onClick={() => hideTable()}>
            Hide Bookable
          </Button>}
        </ButtonGroup>
      </div>
      <div>
        {bookable && <BookableTable rooms={props.rooms} />}
      </div>
    </div>
  );
}
