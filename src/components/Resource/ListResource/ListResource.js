import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService";
import { Comment } from "react-loader-spinner";
import React from "react";
import ResourceTable from "./ResourceTable";
import CsvDownloadButton from "react-json-to-csv";
import {Button} from "@mui/material";
import ReserveResource from "../../Reserve/ReserveResource/reserveresource.component";
export default function ListResource(props) {
  const [resources, setResources] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reservationLoaded,setReservationLoaded] = useState(false);
  const [selectedResource,setSelectedResource] =useState();

  async function getAllResource(props) {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
    setLoaded(true);
  }
  function makeReservation(a){
    setSelectedResource(a);
    setReservationLoaded(true)
  }
  useEffect(() => {
    getAllResource();
    getColumns();
  }, []);

  function getColumns() {
    const columns = [
      {
        value: "Name",
      },
      {
        value: "Working Condition",
      },
      {
        value: "Resource Type",
      },
      {
        value: "Assoicated Room",
      },
      {
        value: "Associated Building",
      },
      {
        value: "Reserve"
      }
    ];
    return columns;
  }
  function getRows(resources) {
    const rows = [];
    resources.map((resource) => {
      console.log(resource);
      var row = {
        a: resource.resourceName,
        b: resource.workingCondition,
        c: resource.resourceType,
        d: resource.room.name,
        e: resource.room.building.name,
        f:<Button onClick={()=>makeReservation(resource.id)}>Reserve</Button>
      };
      rows.push(row);
    });

    return rows;
  }

  if (loaded ) {
    return (

      <div>
        {reservationLoaded ?
            <div>
            <ReserveResource open={selectedResource}/>
            </div>:
        <div>

        {props.currentUser.roles[0] === "ROLE_ADMIN"?<h3> List Resource </h3>:<h3> Reserve Resource </h3>}
        {props.currentUser.roles[0] === "ROLE_ADMIN"&& <CsvDownloadButton
          style={{ backgroundColor: "#154734", color: "#FFB81C" }}
          data={resources}
          filename={"resources.csv"}
          delimiter={","}
        /> }
        <div>
          <ResourceTable columns={getColumns()} rows={getRows(resources)} />
        </div>
      </div>}
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
