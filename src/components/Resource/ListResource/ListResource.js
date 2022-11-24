import { useEffect, useState } from "react";
import ResourceService from "../../../services/ResourceService";
import { Rings } from "react-loader-spinner";
import BuildingService from "../../../services/BuildingService";

import ResourceTable from "./ResourceTable";
import EditResource from "../EditResource/EditResource";
export default function ListResource() {
const [buildings, setBuildings] = useState([]);
    const [resources, setResources] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);

const [selectedResource, setSelectedResource] = useState();



async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
    
  }
  async function getAllResource() {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
    setLoaded(true);
  }



  useEffect(() => {
    getAllResource();
  }, []);

  
  function editResource(resource){
    getAllBuilding();
    setEdit(true)
    setSelectedResource(resource)
    console.log(resource, "Edit button clicked")
  }




  if (loaded) {
    return (
      <div>
        <ResourceTable resources={resources} editResource={editResource}/>
        <div>
            {edit && <EditResource  selectedResource ={selectedResource} buildings={buildings}/> }
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
