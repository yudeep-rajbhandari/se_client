import React, {Component, useEffect, useState} from "react";
import ListResource from "../../Resource/ListResource/ListResource";
import AuthService from "../../../services/auth.service";
import {AppBar, Dialog, Slide, Toolbar, Typography} from "@mui/material";
import {IconButton} from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import ReserveRoom from "../ReserveRoom/reserve";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function  ReserveResource(props){
  const [open1, setOpen1] =useState(true);
  const user = AuthService.getCurrentUser();
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (filter) => {
    setOpen1(false);
  };
  return(
      <div>
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
    <h1>aaaaaa</h1>
    {/*<ReserveRoom notify1={notify1} showChild1={showChild1} room={room} />*/}
  </Dialog>

      </div>
  )
}
