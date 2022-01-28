import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../store/actions/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #ece9e9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SimpleModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({
    modal: state.modal.modal,
  }));

  //REDUX
  const onModalClose = useCallback(() => dispatch(actions.modalClose()), []);

  const body = (
    <div className={classes.paper}>
      <h4 id="simple-modal-title">You are loggout!</h4>
      <button onClick={onModalClose}>OK</button>
    </div>
  );

  console.log("Modsal", modal);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={modal}
        onClose={onModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default React.memo(SimpleModal);
