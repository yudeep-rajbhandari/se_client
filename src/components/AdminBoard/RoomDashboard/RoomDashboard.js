import RoomDashboardTable from "./RoomDashboardTable";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import BookableTable from "./BookableTable";
import RoomtypeTable from "./RoomtypeTable";
import HideSourceIcon from "@mui/icons-material/HideSource";

export default function RoomDashboard(props) {
  const [bookable, setBookable] = useState(false);
  const [roomType, setRoomType] = useState(false);
  function showBookable() {
    setBookable(true);
    setRoomType(false);
  }

  function showRoomType() {
    setRoomType(true);
    setBookable(false);
  }
  function hideTable() {
    setBookable(false);
    setRoomType(false);
  }
  return (
    <div>
      <RoomDashboardTable rooms={props.rooms} />
      <div>
        <ButtonGroup variant="text" aria-label="text button group">
          {!bookable && (
            <Button variant="text" onClick={() => showBookable()}>
              Bookable
            </Button>
          )}
          {bookable && (
            <Button
              startIcon={<HideSourceIcon />}
              color="error"
              variant="text"
              onClick={() => hideTable()}
            >
              Hide Bookable
            </Button>
          )}

          {!roomType && (
            <Button variant="text" onClick={() => showRoomType()}>
              RoomType
            </Button>
          )}
          {roomType && (
            <Button
              startIcon={<HideSourceIcon />}
              color="error"
              variant="text"
              onClick={() => hideTable()}
            >
              Hide RoomType
            </Button>
          )}
        </ButtonGroup>
      </div>
      <div>
        {bookable && <BookableTable rooms={props.rooms} />}
        {roomType && <RoomtypeTable rooms={props.rooms} />}
      </div>
    </div>
  );
}
