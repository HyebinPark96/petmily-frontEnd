import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useStore from '../../zustand/store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose 
      ? 
      (
        <IconButton
         aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
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
}
  
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const MissingAnimalDetailDialog = () => {
  const open = useStore(state => state.open);
  const closeDialog = useStore(state => state.closeDialog);
  const missingAnimalDetail = useStore(state => state.missingAnimalDetail);

  const handleClose = () => {
    closeDialog(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          실종/보호동물 상세정보
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            접수일: {missingAnimalDetail.happenDt} <br />
            발견장소: {missingAnimalDetail.happenPlace} <br /> 
          </Typography>

          <Typography gutterBottom>
            품종: {missingAnimalDetail.kindCd} <br />
            색상: {missingAnimalDetail.colorCd} <br /> 
            나이: {missingAnimalDetail.age} <br />
            체중: {missingAnimalDetail.weight} <br />
            성별: {missingAnimalDetail.sexCd} <br />
            중성화여부: {missingAnimalDetail.neuterYn} <br />
            특징: {missingAnimalDetail.specialMark} <br />
          </Typography>

          {/* <Typography gutterBottom>
            보호소이름: {missingAnimalDetail.careNm}
            보호상태: {missingAnimalDetail.processState}
          </Typography> */}
        </DialogContent>
        
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  )
}

export default MissingAnimalDetailDialog