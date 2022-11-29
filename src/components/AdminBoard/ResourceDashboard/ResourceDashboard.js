
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ResourceDashboardTable from "./ResourceDashboardTable";
import ResourceTypeTable from "./ResourceTypeTable";

import WorkingConditionTable from './WorkingConditionTable';


export default function ResourceDashoard(props) {
  const [resourceType, setResourceType] = useState(false);
  const [workingCondition, setWorkingCondition] = useState(false);

  function showResourceType() {
    setResourceType(true);
    setWorkingCondition(false)

  }
  function hideTable() {
    setResourceType(false);
    setWorkingCondition(false);
  }

  function showWorkingCondition() {
    setWorkingCondition(true);
    setResourceType(false)

  }
  function hideWorkingCondition() {
    setWorkingCondition(false);

  }
  return (
    <div>
      <ResourceDashboardTable resources={props.resources} />
      <div >
        <ButtonGroup variant="text" aria-label="text button group">
          {!resourceType && <Button variant="text" onClick={() => showResourceType()}>
            Resource Type
          </Button>}
          {resourceType && <Button color="error" variant="text" onClick={() => hideTable()}>
            Hide Resource Type
          </Button>}
          {!workingCondition && <Button variant="text" onClick={() => showWorkingCondition()}>
            Working Condition
          </Button>}
          {workingCondition && <Button color="error" variant="text" onClick={() => hideTable()}>
            Hide Working Condition
          </Button>}
        </ButtonGroup>

      </div>
      <div>
        {resourceType && <ResourceTypeTable resources={props.resources} />}
      </div>
      <div>
        {workingCondition && <WorkingConditionTable resources={props.resources} />}
      </div>

    </div >
  );
}
