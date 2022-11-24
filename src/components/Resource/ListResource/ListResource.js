import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService";
import { Rings } from "react-loader-spinner";

import ResourceTable from "./ResourceTable";
export default function ListResource() {
  const [resources, setResources] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);



  async function getAllResource() {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
    setLoaded(true);
  }

  useEffect(() => {
    getAllResource();
  }, []);

  
  function editResource(resourceId){
    setEdit(true)
    console.log(resourceId, "Edit button clicked")
  }




  if (loaded) {
    return (
      <div>
        <ResourceTable resources={resources} editResource={editResource}/>
        <div>
            {edit && <h3> Edit Resource</h3> }
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
