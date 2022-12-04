import React, {Component, useEffect, useState} from "react";
import ListResource from "../../Resource/ListResource/ListResource";
import AuthService from "../../../services/auth.service";
import {AppBar, Dialog, Slide, Toolbar, Typography} from "@mui/material";
import {IconButton} from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import ReserveRoom from "../ReserveRoom/reserve";
import ReserveResourcePicker from "./reserveresourcepicker.component";
import {toast, ToastContainer} from "react-toastify";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function  ReserveResource(props){
  const [open1, setOpen1] =useState(props.open);
  const user = AuthService.getCurrentUser();
  const [showChild,setShowChild] = useState(false)
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const showChild1 = (childData) => {
    console.log("childData called");
    setShowChild(childData);
  };
  const notify1 = (childData) => {
    toast(childData);
  };
  const handleClose1 = (filter) => {
    setOpen1(false);
  };
  return(
      <div>
        <ToastContainer/>

        <ListResource currentUser={user}/>
  <Dialog
      fullScreen
      open={open1}
      onClose={handleClose1}
      TransitionComponent={Transition}
  >
    <AppBar style ={{backgroundColor: "#154734", color: "#FB81C"}} sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
            edge="start"
            style ={{backgroundColor: "#154734", color: "#FFB81C"}}
            onClick={handleClose1}
            aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography style ={{backgroundColor: "#154734", color: "#FFB81C"}}sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Select Date
        </Typography>
      </Toolbar>

    </AppBar>
    <ReserveResourcePicker notify1={notify1} showChild1={showChild1} resource={props.resource} open={handleClose1}/>
  </Dialog>

      </div>
  )
}
