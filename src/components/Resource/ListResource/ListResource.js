import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService";
import { Comment } from "react-loader-spinner";
import React from "react";
import ResourceTable from "./ResourceTable";
import CsvDownloadButton from "react-json-to-csv";
export default function ListResource(props) {
  const [resources, setResources] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getAllResource(props) {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
    setLoaded(true);
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
      };
      rows.push(row);
    });
    return rows;
  }

  if (loaded && props.currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <h3> List Resource </h3>
        <CsvDownloadButton
          data={resources}
          filename={"resources.csv"}
          delimiter={","}
        />
        <div>
          <ResourceTable columns={getColumns()} rows={getRows(resources)} />
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
