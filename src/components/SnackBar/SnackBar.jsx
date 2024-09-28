import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";
import { snackbarActions } from "../../store/store";
import Fade from "@mui/material/Fade";

export default function SnackBar() {
  const {
    isOpen = flase,
    message,
    type,
  } = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

  const vertical = "top";
  const horizontal = "center";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackbarActions.closeBar());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={Fade}
        key={vertical + horizontal}
        style={{ top: "6rem" }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
          icon={false}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
