import React, { useEffect, useState } from "react";
import AllotmentService from "../../services/AllotmentService";
import Button from "@mui/material/Button";
import MyAllotment from "./Allotment/MyAllotment";
import { Rings } from "react-loader-spinner";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function UserBoard(props) {
  const [currentUser] = useState(props.currentUser);

  const [myAllotment, setMyAllotment] = useState(false);
  const [clickAllotment, setClickAllotment] = useState(false);

  const [loaded, setLoaded] = useState(false);
  async function getMyAllotment(userId) {
    const { data } = await AllotmentService.getMyAllotment(userId);
    setMyAllotment(data);
  }

  useEffect(() => {
    getMyAllotment(currentUser.id);
    setLoaded(true);
  }, []);

  function viewAllotment() {
    setClickAllotment(true);
  }
  function hideAllotment() {
    setClickAllotment(false);
  }
  if (loaded) {
    return (
      <div>
        <h3> Welcome {currentUser.email}</h3>
        <h3>Dashboard</h3>
        {!clickAllotment && (
          <Button variant="outlined" onClick={() => viewAllotment()}>
            My Allotment
          </Button>
        )}
        {clickAllotment && (
          <Button variant="outlined" onClick={() => hideAllotment()}>
            Hide Allotment
          </Button>
        )}
        {clickAllotment && <MyAllotment myAllotment={myAllotment} />}
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
