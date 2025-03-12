import React, { useState } from "react";
import { Button, FormControl, MenuItem, Popover, Grid } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";

function TimeFrame() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRange, setSelectedRange] = useState("Today");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    // Auto-adjust start/end dates based on the selection
    const today = dayjs();
    switch (range) {
      case "Yesterday":
        setStartDate(today.subtract(1, "day"));
        setEndDate(today.subtract(1, "day"));
        break;
      case "Last 7 Days":
        setStartDate(today.subtract(7, "day"));
        setEndDate(today);
        break;
      case "Last 14 Days":
        setStartDate(today.subtract(14, "day"));
        setEndDate(today);
        break;
      case "Last 30 Days":
        setStartDate(today.subtract(30, "day"));
        setEndDate(today);
        break;
      case "Last 60 Days":
        setStartDate(today.subtract(60, "day"));
        setEndDate(today);
        break;
      case "Last 90 Days":
        setStartDate(today.subtract(90, "day"));
        setEndDate(today);
        break;
      case "Last 1 Year":
        setStartDate(today.subtract(1, "year"));
        setEndDate(today);
        break;
      default:
        setStartDate(today);
        setEndDate(today);
    }
  };

  const handleApply = () => {
    console.log("Selected Range:", selectedRange);
    console.log("Start Date:", startDate.format("MM/DD/YYYY"));
    console.log("End Date:", endDate.format("MM/DD/YYYY"));
    handleClose();
  };

  const handleClear = () => {
    setSelectedRange("Today");
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  return (
    <>
      <FormControl size="small">
        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<AccessTimeIcon sx={{ fontSize: 12 }} />} // ✅ Works correctly
          sx={{
            border: "1px solid #DDE1E5",
            color: "#202328",
            textTransform: "none",
            padding: "6px 12px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            fontWeight: "400",
            gap: "4px",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "#202328",
            },
            // "&:focus, &:focus-visible": {
            //   border: "2px solid #146ef5",
            // },
          }}
        >
          Time Period{" "}
          <ArrowDropDownIcon sx={{ fontSize: 24, color: "#757575" }} />
        </Button>
      </FormControl>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "4px",
            width: "350px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
            position: "relative",
          },
        }}
      >
        <div style={{ paddingBlock: 16, width: "100%" }}>
          {[
            "Today",
            "Yesterday",
            "Last 7 Days",
            "Last 14 Days",
            "Last 30 Days",
            "Last 60 Days",
            "Last 90 Days",
            "Last 1 Year",
          ].map((option) => (
            <MenuItem
              key={option}
              selected={selectedRange === option}
              onClick={() => handleRangeSelect(option)}
              sx={{
                padding: "0px 24px 0px 48px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between", // Aligns text and checkmark
                bgcolor:
                  selectedRange === option
                    ? "#F4F5F7 !important"
                    : "transparent", // Background color
                "&:hover": { bgcolor: "#E0E2E7" }, // Slightly darker on hover
              }}
            >
              {selectedRange === option && (
                <CheckIcon
                  sx={{
                    position: "absolute",
                    left: "16px",
                    color: "primary.main",
                  }}
                />
              )}{" "}
              {option}
              {/* Show checkmark if selected */}
            </MenuItem>
          ))}

          {/* Date Pickers in 50-50 Grid Layout */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ marginTop: 2, px: "16px" }}>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  slotProps={{
                    textField: { size: "small", variant: "outlined" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  slotProps={{
                    textField: { size: "small", variant: "outlined" },
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>

          <div style={{ paddingInline: "16px" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleApply}
            >
              Apply
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}

export default TimeFrame;
