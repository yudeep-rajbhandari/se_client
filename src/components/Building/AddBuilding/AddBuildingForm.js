// import { TextField } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function AddBuildingForm(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="addBuilding">
        <h3>Add Building</h3>
        <Box
          onSubmit={props.onSubmit}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="name"
              label="Building Name"
              inputRef={props.nameRef}
              type="name"
            />
            <TextField
              id="floors"
              label="Number of Floors"
              type="number"
              inputRef={props.floorsRef}
            />
            <label htmlFor="address">
              {" "}
              <h3>Add address:</h3>
            </label>
            <TextField
              label="Street"
              inputRef={props.streetRef}
              type="street"
              id="street"
            />
            <TextField
              id="city"
              type="city"
              label="City"
              inputRef={props.cityRef}
              defaultValue={"Waco"}
            />
            <TextField
              label="State"
              inputRef={props.stateRef}
              type="state"
              id="state"
              defaultValue={"Texas"}
            />
            <TextField
              label="Zip"
              inputRef={props.zipRef}
              type="zip"
              id="zip"
              defaultValue={"76706"}
            />
          </div>
          <div>
            <label htmlFor="address">
              {" "}
              <h3>Fill in the latitude and longitude info</h3>
            </label>
            <TextField
              label="Latitude"
              inputRef={props.latitudeRef}
              type="latitude"
              id="latitude"
            />
            <TextField
              label="Longitude"
              inputRef={props.longitudeRef}
              type="longitude"
              id="longitude"
            />
          </div>
          <div>
            <label htmlFor="gates">
              {" "}
              <h3>Fill in the gates info</h3>
            </label>

            <TextField
              label="gate"
              inputRef={props.gateNameRef}
              type="name"
              id="gateName"
            />
            <TextField
              label="gateLatRef"
              inputRef={props.gateLatRef}
              type="gateLatRef"
              id="gateLatRef"
            />
            <TextField
              label="gateLongRef"
              inputRef={props.gateLongRef}
              type="gateLongRef"
              id="gateLongRef"
            />
          </div>
          <Button
            startIcon={<SaveRoundedIcon />}
            variant="contained"
            type="submit"
          >
            Save Building
          </Button>
        </Box>
      </div>
    </div>
  );
}
