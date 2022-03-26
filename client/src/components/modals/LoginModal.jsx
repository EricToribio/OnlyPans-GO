/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Login from './Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({setLoggedInUser,changeOpen,loginOpen}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    loginOpen && handleOpen()
    !loginOpen && handleClose()
  },[loginOpen])
  const buttonStyle = {
    ':hover': {
      bgcolor: '#ef5350 !important',
      color: 'white',
    },
    color: '#fff',
    fontWeight: 'bold'
  }
  const change = (name) => {
    changeOpen( name)
    handleClose()
  }
  return (
    <div>
      <Button onClick={(e) => handleOpen()}
        sx={buttonStyle}
      >
        Log In
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* ENTER LOGIN HERE */}
            <Login handleClose={handleClose} setLoggedInUser={setLoggedInUser} changeOpen={change}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
