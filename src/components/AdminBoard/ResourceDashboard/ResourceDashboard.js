
import React, { useState } from 'react';
import Button from "@mui/material/Button";

import ResourceDashboardTable from "./ResourceDashboardTable";
import ResourceTypeTable from "./ResourceTypeTable";



export default function ResourceDashoard(props) {
  const [resourceType, setResourceType] = useState(false);

  function showResourceType() {
    setResourceType(true);
    console.log("divide by working condition")
  }
  function hideResourceType() {
    setResourceType(false);

  }
  return (
    <div>
      <ResourceDashboardTable resources={props.resources} />
      <div >
        {!resourceType && <Button variant="text" onClick={() => showResourceType()}>
          Resource Type
        </Button>}

        {resourceType && <Button color="error" variant="text" onClick={() => hideResourceType()}>
          Hide Resource Type
        </Button>}
      </div>
      <div>
        {resourceType && <ResourceTypeTable resources={props.resources} />}
      </div>

    </div >
  );
}
