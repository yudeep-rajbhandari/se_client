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
        <h3 style={{ color: "#154734" }}>Add Building</h3>
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
              required
            />
            <TextField
              id="floors"
              label="Number of Floors"
              type="number"
              inputRef={props.floorsRef}
              required
            />
          </div>
          <div>
            <label htmlFor="address">
              {" "}
              <h3 style={{ color: "#154734" }}>Add address:</h3>
            </label>
            <TextField
              label="Street"
              inputRef={props.streetRef}
              type="street"
              id="street"
              required
            />
            <TextField
              id="city"
              type="city"
              label="City"
              inputRef={props.cityRef}
              defaultValue={"Waco"}
              required
            />
            <TextField
              label="State"
              inputRef={props.stateRef}
              type="state"
              id="state"
              defaultValue={"Texas"}
              required
            />
            <TextField
              label="Zip"
              inputRef={props.zipRef}
              type="zip"
              id="zip"
              defaultValue={"76706"}
              required
            />
          </div>
          <div>
            <label htmlFor="address">
              {" "}
              <h3 style={{ color: "#154734" }}>
                Fill in the latitude and longitude info
              </h3>
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

          <Button
            startIcon={<SaveRoundedIcon />}
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#154734", color: "#FFB81C" }}
          >
            Save Building
          </Button>
        </Box>
      </div>
    </div>
  );
}
