import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useStore from "../../zustand/store";
import DialogActions from "@mui/material/DialogActions";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const MissingAnimalDetailDialog = () => {
  const open = useStore((state) => state.open);
  const closeDialog = useStore((state) => state.closeDialog);
  const missingAnimalDetail = useStore((state) => state.missingAnimalDetail);

  const handleClose = () => {
    closeDialog(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            height: "100%",
            maxHeight: "550px",
            width: "1000px",
          },
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        실종/보호동물 상세정보
      </BootstrapDialogTitle>

      <DialogContent dividers style={{ height: "500px" }}>
        <Typography gutterBottom>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">접수일 </p>
              <input
                type="text"
                value={missingAnimalDetail.happenDt}
                className="input-read disabled"
                disabled
              />
            </div>
            <div className="text-field margin-bottom-10">
              <p className="text">발견장소 </p>
              <input
                type="text"
                value={missingAnimalDetail.happenPlace}
                className="input-read disabled"
                disabled
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">품종 </p>
              <input
                type="text"
                value={missingAnimalDetail.kindCd}
                className="input-read disabled"
                disabled
              />
            </div>
            <div className="text-field margin-bottom-10">
              <p className="text">색상 </p>
              <input
                type="text"
                value={missingAnimalDetail.colorCd}
                className="input-read disabled"
                disabled
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">나이 </p>
              <input
                type="text"
                value={missingAnimalDetail.age}
                className="input-read disabled"
                disabled
              />
            </div>
            <div className="text-field margin-bottom-10">
              <p className="text">체중 </p>
              <input
                type="text"
                value={missingAnimalDetail.weight}
                className="input-read disabled"
                disabled
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">성별 </p>
              <input
                type="text"
                value={missingAnimalDetail.sexCd}
                className="input-read disabled"
                disabled
              />
            </div>
            <div className="text-field margin-bottom-10">
              <p className="text">중성화여부 </p>
              <input
                type="text"
                value={missingAnimalDetail.neuterYn}
                className="input-read disabled"
                disabled
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">보호소이름 </p>
              <input
                type="text"
                value={missingAnimalDetail.careNm}
                className="input-read disabled"
                disabled
              />
            </div>
            <div className="text-field margin-bottom-10">
              <p className="text">보호상태 </p>
              <input
                type="text"
                value={missingAnimalDetail.processState}
                className="input-read disabled"
                disabled
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-field margin-bottom-10">
              <p className="text">특징 </p>
              <textarea 
                value={missingAnimalDetail.specialMark}
                className="input-read textarea disabled"
                cols="40" 
                rows="5"
                disabled
              />
            </div>
          </div>
        </Typography>
      </DialogContent>

      <DialogActions>
        <button
          type="button"
          className="btns btn-gray"
          autoFocus
          onClick={handleClose}
        >
          닫기
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingAnimalDetailDialog;
