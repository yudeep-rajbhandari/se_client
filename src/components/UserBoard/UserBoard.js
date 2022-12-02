import React, { useEffect, useState } from "react";
import AllotmentService from "../../services/AllotmentService";
import AuthService from "../../services/auth.service";
import MyAllotment from "./Allotment/MyAllotment";
import { Comment } from "react-loader-spinner";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReservationService from "../../services/ReservationService";
import MyReservation from "./Reservation/MyReservation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import HideSourceIcon from "@mui/icons-material/HideSource";
import PrimaryButton from "../../common/Button/PrimaryButton";
import SecondaryButton from "../../common/Button/SecondaryButton";
import ErrorButton from "../../common/Button/ErrorButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PrimaryHeader from "../../common/Header/PrimaryHeader";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
export default function UserBoard(props) {
  const currentUser = AuthService.getCurrentUser();
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
        <PrimaryHeader header="Dashboard" />
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Box sx={{ bgcolor: "#154734", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                {!clickAllotment && (
                  <PrimaryButton
                    title="My Allotment"
                    icon={<AssignmentIndIcon />}
                    onClick={() => viewAllotment()}
                  />
                )}
                {clickAllotment && (
                  <ErrorButton
                    title="Hide Allotment"
                    icon={<HideSourceIcon />}
                    onClick={() => hide()}
                  />
                )}
              </ButtonGroup>
            </Box>

            <Box sx={{ bgcolor: "#FFB81C", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                {!clickReservation && (
                  <SecondaryButton
                    title=" My Reservation"
                    icon={<EventSeatIcon />}
                    onClick={() => viewReservation()}
                  />
                )}
                {clickReservation && (
                  <ErrorButton
                    title="Hide My Reservation"
                    icon={<HideSourceIcon />}
                    onClick={() => hide()}
                  />
                )}
              </ButtonGroup>
            </Box>
            <Box
              spacing={2}
              sx={{ bgcolor: "#154734", height: "10vh", width: "150vh" }}
            >
              <ButtonGroup variant="text" aria-label="text button group">
                <PrimaryButton
                  icon={<BookOnlineIcon />}
                  title="Reserve Room"
                  onClick={(event) => (window.location.href = "/findroom")}
                />
                <PrimaryButton
                  icon={<BookOnlineIcon />}
                  title="Reserve Resource"
                  onClick={(event) =>
                    (window.location.href = "/reserveresource")
                  }
                />
              </ButtonGroup>
            </Box>
          </Container>

          <Container>
            <Box
              component="span"
              sx={{ p: 2, border: "0px", height: "10vh", width: "150vh" }}
            ></Box>
          </Container>

          <Container>
            <Box
              component="span"
              sx={{ p: 2, border: "0px", height: "10vh", width: "150vh" }}
            >
              {clickAllotment && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <MyAllotment myAllotment={myAllotment} />
                </Box>
              )}

              {clickReservation && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <MyReservation
                    myReservation={myReservation}
                    refreshReservation={refreshReservation}
                  />
                </Box>
              )}
            </Box>
          </Container>
        </React.Fragment>
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
