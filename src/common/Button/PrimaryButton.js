import { Button } from "@mui/material";

export default function PrimaryButton(props) {
  return (
    <Button
      style={{ backgroundColor: "#154734", color: "#FFB81C" }}
      startIcon={props.icon}
      onClick={props.onClick}
    >
      {" "}
      {props.title}
    </Button>
  );
}
