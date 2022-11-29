import React, { useEffect, useState } from "react";
import AllotmentService from "../../services/AllotmentService";
import Button from "@mui/material/Button";
import MyAllotment from "./Allotment/MyAllotment";
import { Rings } from "react-loader-spinner";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReservationService from "../../services/ReservationService";
import MyReservation from "./Reservation/MyReservation";

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
              <Button variant="outlined" onClick={() => viewAllotment()}>
                My Allotment
              </Button>
            )}
            {clickAllotment && (
              <Button color="error" variant="outlined" onClick={() => hide()}>
                Hide Allotment
              </Button>
            )}
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup>
            {!clickReservation && (
              <Button variant="outlined" onClick={() => viewReservation()}>
                My Reservation
              </Button>
            )}
            {clickReservation && (
              <Button color="error" variant="outlined" onClick={() => hide()}>
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
