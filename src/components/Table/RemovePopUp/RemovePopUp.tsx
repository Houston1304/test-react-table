import { Button, Typography } from "@mui/material";
import "./RemovePopUpStyle.css";

function RemovePopUp({
  close,
  callback,
}: {
  close: (arg: boolean) => void;
  callback: () => void;
}) {
  return (
    <div className="popUpBackground">
      <div className="closePopUp">
        <Typography>Вы уверены?</Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              callback();
              close(false);
            }}
          >
            ДА
          </Button>
          <Button variant="contained" onClick={() => close(false)}>
            Нет
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RemovePopUp;
