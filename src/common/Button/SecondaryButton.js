import { Button } from "@mui/material";

export default function SecondaryButton(props) {
  return (
    <Button
      style={{ backgroundColor: "#FFB81C", color: "#154734" }}
      startIcon={props.icon}
      onClick={props.onClick}
    >
      {" "}
      {props.title}
    </Button>
  );
}
