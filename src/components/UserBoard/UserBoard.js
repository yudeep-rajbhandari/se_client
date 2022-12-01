import React, { useEffect, useState } from "react";
import AllotmentService from "../../services/AllotmentService";
import Button from "@mui/material/Button";
import MyAllotment from "./Allotment/MyAllotment";
import { Comment } from "react-loader-spinner";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReservationService from "../../services/ReservationService";
import MyReservation from "./Reservation/MyReservation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import HideSourceIcon from "@mui/icons-material/HideSource";
export default function UserBoard(props) {
  const [currentUser] = useState(props.currentUser);

  const [myAllotment, setMyAllotment] = useState([]);
  const [clickAllotment, setClickAllotment] = useState(false);

  const [myReservation, setMyReservation] = useState([]);
  const [clickReservation, setClickReservation] = useState(false);

  const [loaded, setLoaded] = useState(false);

  async function getMyAllotment(userId) {
    const { data } = await AllotmentService.getMyAllotment(userId);
    setMyAllotment(data);
  }

  async function getMyReservation(userId) {
    const { data } = await ReservationService.getMyReservation(userId);
    setMyReservation(data);
  }
  useEffect(() => {
    getMyAllotment(currentUser.id);
    getMyReservation(currentUser.id);
    setLoaded(true);
  }, []);

  function viewAllotment() {
    setClickAllotment(true);
    setClickReservation(false);
  }
  function hide() {
    setClickAllotment(false);
    setClickReservation(false);
  }

  function viewReservation() {
    setClickReservation(true);
    setClickAllotment(false);
  }

  function refreshReservation() {
    getMyReservation(currentUser.id);
  }

  console.log(myReservation);
  if (loaded) {
    return (
      <div>
        <div>
          Welcome
          <Button onClick={(event) => (window.location.href = "/profile")}>
            {props.currentUser.username}
          </Button>
        </div>
        <div>
          <ButtonGroup>
            {!clickAllotment && (
              <Button
                startIcon={<AssignmentIndIcon />}
                variant="outlined"
                onClick={() => viewAllotment()}
              >
                My Allotment
              </Button>
            )}
            {clickAllotment && (
              <Button
                startIcon={<HideSourceIcon />}
                color="error"
                variant="outlined"
                onClick={() => hide()}
              >
                Hide Allotment
              </Button>
            )}
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup>
            {!clickReservation && (
              <Button
                startIcon={<EventSeatIcon />}
                variant="outlined"
                onClick={() => viewReservation()}
              >
                My Reservation
              </Button>
            )}
            {clickReservation && (
              <Button
                startIcon={<HideSourceIcon />}
                color="error"
                variant="outlined"
                onClick={() => hide()}
              >
                Hide Reservation
              </Button>
            )}
          </ButtonGroup>
        </div>

        <div>{clickAllotment && <MyAllotment myAllotment={myAllotment} />}</div>
        <div>
          {clickReservation && (
            <MyReservation
              myReservation={myReservation}
              refreshReservation={refreshReservation}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
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
