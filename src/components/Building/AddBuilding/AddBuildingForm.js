// import { TextField } from "@mui/material";
import TextField from '@mui/material/TextField';
import {Box, Stack} from '@mui/system';
import AddBuilding from "./AddBuilding";
import Button from "@mui/material/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";


export default function AddBuildingForm(props) {
  return (

    <div>
      <h3>Add Building</h3>
      <Box onSubmit={props.onSubmit} component="form"
           sx={{
             '& .MuiTextField-root': {m: 1, width: '25ch'},
           }}
           noValidate
           autoComplete="off"
      >
        <div>

          <TextField
            id="name"
            label="Building Name"
            inputRef={props.nameRef} type="name"
          />


          <TextField
            id="floors"
            label="Number of Floors"
            type="number"
            inputRef={props.floorsRef}

          />


          <br/>
          <br/>
          <label htmlFor="address"> Please add the building address below:</label>
          <br/>

          <TextField
            label="Street"
            inputRef={props.streetRef}
            type="street"
            id="street"
          />


          <br/>
          <TextField
            id="city"
            type="city"
            label="City"
            inputRef={props.cityRef}
          />


          <br/>

          <TextField
            label="State"
            inputRef={props.stateRef}
            type="state"
            id="state"
          />

          <br/>

          <TextField
            label="Zip"
            inputRef={props.zipRef}
            type="zip"
            id="zip"
          />

          <br/>

          <Button
            startIcon={<SaveRoundedIcon />}
            variant="contained"
            type="submit"
          >
            Save Building
          </Button>
        </div>
      </Box>
    </div>
  );
}
