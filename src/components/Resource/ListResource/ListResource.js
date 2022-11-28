import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService";
import { Rings } from "react-loader-spinner";
import React from "react";
import ResourceTable from "./ResourceTable";

export default function ListResource() {
  const [resources, setResources] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getAllResource() {
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

  if (loaded) {
    return (
      <div>
        <h3> List Resource </h3>
        <div>
          <ResourceTable columns={getColumns()} rows={getRows(resources)} />
        </div>
      </div>
    );
  }
  if (!loaded) {
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
