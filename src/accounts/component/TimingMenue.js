/* eslint-disable */
import { useRef, useState } from "react";
import { format } from "date-fns";
import MenuPopover from "./MenuPopover";
import {
  Menu,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import calendaricon from "../../assets/icons/calendar-icon.svg";
// ----------------------------------------------------------------------

export default function TimingMenue({ Allspa }) {
  const [open, setOpen] = useState(null);
  const anchorRef = useRef(null);
  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }

  // console.log(formatTime(Allspa?.hourOfOpertaion[5].sat.from));

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Typography
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
        variant="subtitle2"
        noWrap
        ref={anchorRef}
      >
        <img src={calendaricon} />
      </Typography>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        // PaperProps={{
        //   sx: {
        //     width: '170px',
        //     maxWidth: '100%',

        //   },
        // }}
        style={{
          borderRadius: "5px",
          boxShadow: "1.8px 1.8px 12.6px rgba(200, 23, 93, 0.15)",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[0]?.mon?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            // marginTop: '-7px',
            paddingTop: "2px",
            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Monday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
            // '&:hover': {
            //   background: 'none',
            // },
          }}
        >
          {Allspa.hourOfOpertaion[0]?.mon?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[0].mon.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[0].mon.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[1]?.tue?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: "-5px",
            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            paddingTop: "2px",
            color: "#FFFFFF",
          }}
        >
          Tuseday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        >
          {Allspa.hourOfOpertaion[1]?.tue?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[1].tue.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[1].tue.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[2]?.wed?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: "-5px",
            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            paddingTop: "2px",
            color: "#FFFFFF",
          }}
        >
          Wednesday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        >
          {Allspa.hourOfOpertaion[2]?.wed?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[2].wed.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[2].wed.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[3]?.thu?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",

            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            marginTop: "-5px",
            color: "#FFFFFF",
            paddingTop: "2px",
          }}
        >
          Thursday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        >
          {Allspa.hourOfOpertaion[3]?.thu?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[3].thu.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[3].thu.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[4]?.fri?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",

            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            marginTop: "-5px",
            color: "#FFFFFF",
            paddingTop: "2px",
          }}
        >
          Friday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        >
          {Allspa.hourOfOpertaion[4]?.fri?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[4].fri.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[4].fri.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[5]?.sat?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: "-5px",
            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            paddingTop: "2px",
            color: "#FFFFFF",
          }}
        >
          Saturday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "transparent",
            height: "25px",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        >
          {Allspa.hourOfOpertaion[5]?.sat?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[5].sat.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[5].sat.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "21px",
            background:
              Allspa.hourOfOpertaion[6]?.sun?.isOpen === "Closed"
                ? "#C8175D"
                : "#5AB789",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",

            textAlign: "center",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "17px",
            textTransform: "uppercase",
            marginTop: "-5px",
            color: "#FFFFFF",
            paddingTop: "2px",
          }}
        >
          Sunday
        </Box>
        <Box
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4A4A4A",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginBottom: "-7px",
            backgroundColor: "transparent",
            height: "25px",

            marginBottom: "-7px",
          }}
        >
          {Allspa.hourOfOpertaion[6]?.sun?.isOpen === "true" ? (
            <>
              {formatTime(Allspa.hourOfOpertaion[6].sun.from)} -{" "}
              {formatTime(Allspa.hourOfOpertaion[6].sun.to)}
            </>
          ) : (
            <>Closed</>
          )}
        </Box>
      </MenuPopover>
    </>
  );
}
