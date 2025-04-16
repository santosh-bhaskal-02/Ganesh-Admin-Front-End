import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Slide,
  Box,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

// Slide transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogBox = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, scale: 0.8, y: -50 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 50 },
        transition: { duration: 0.3, ease: "easeInOut" },
        className: "rounded-2xl shadow-2xl",
        sx: { overflow: "hidden", borderRadius: 4 },
      }}>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <WarningAmberIcon fontSize="large" color="warning" />
            <Typography variant="h6" fontWeight="bold" color="warning.main">
              Confirm Deletion
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ color: "text.secondary" }}>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ mt: 3, justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error" sx={{ ml: 1 }}>
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogBox;
