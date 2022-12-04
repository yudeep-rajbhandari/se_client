import { Button } from "@mui/material";

export default function ErrorButton(props) {
  return (
    <Button color="error" startIcon={props.icon} onClick={props.onClick}>
      {" "}
      {props.title}
    </Button>
  );
}
