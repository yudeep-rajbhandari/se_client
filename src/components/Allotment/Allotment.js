import { useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import React from "react";
import { Comment } from "react-loader-spinner";
import AllotmentService from "../../services/AllotmentService";
import AddAllotment from "./AddAllotment/AddAllotment";
import ViewAllotment from "./ViewAllotment/ViewAllotment";
import BuildingService from "../../services/BuildingService";

export default function Allotment(props) {
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [allotments, setAllotments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getAllUser() {
    const { data } = await AdminService.getAllUser();
    setUsers(data);
    setLoaded(true);
  }

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  async function getAllAllotment() {
    const { data } = await AllotmentService.getAllAllotment();
    setAllotments(data);
  }

  useEffect(() => {
    getAllUser();
    getAllBuilding();
    getAllAllotment();
    setLoaded(true);
  }, []);

  function refreshAllotment() {
    getAllAllotment();
  }

  if (loaded && props.currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <AddAllotment
          users={users}
          buildings={buildings}
          refreshAllotment={refreshAllotment}
        />
        <ViewAllotment
          allotments={allotments}
          refreshAllotment={refreshAllotment}
        />
      </div>
    );
  } else {
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
    </div>;
  }
}
