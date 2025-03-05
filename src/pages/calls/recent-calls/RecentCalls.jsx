import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  Typography,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Search,
  FilterList,
  MoreVert,
  PlayArrow,
  Pause,
  Download,
} from "@mui/icons-material";
import ColorAvatar from "../../../components/color-avatar/ColorAvatar";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const fakeData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: [
    "Oretha Brown",
    "Linda Wittmann",
    "Unknown",
    "Khalif Rainey",
    "Britny Hairston",
    "Winfred Tramel",
    "Barbara Gordon",
    "Ivana Crump",
  ][i % 8],
  initials: ["OB", "LW", "U", "KR", "BH", "WT", "BG", "IC"][i % 8],
  time: "Mar 05 2025, 07:4" + (i % 10) + " PM",
  result: i % 5 === 0 ? "Answered" : "--",
  contact: "(414) 379-01" + (10 + (i % 10)),
  office: "(414) 354-2300",
  user: ["Lizzet Vasquez", "Phone 112", "Phone 111"][i % 3],
  audioUrl: `https://www.soundjay.com/button/beep-${(i % 3) + 1}.mp3`, // Fake audio URLs
}));

const tableHeaders = [
  "Contact Name",
  "Time",
  "Result",
  "Contact Number",
  "Office Number",
  "Office User",
  "Call Recording",
  "",
];

function RecentCalls() {
  const [search, setSearch] = useState("");
  const [isScrolledX, setIsScrolledX] = useState(false); // Track horizontal scroll
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const filteredData = fakeData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState({});
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          tableContainerRef.current;
        setIsScrolledX(scrollLeft > 0 && scrollWidth > clientWidth);
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handlePlayAudio = (row) => {
    if (playingId === row.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = row.audioUrl;
      audioRef.current.play();
      setPlayingId(row.id);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && playingId) {
        const progressValue =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress((prev) => ({ ...prev, [playingId]: progressValue }));
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", () => setPlayingId(null));

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgress);
      audioRef.current?.removeEventListener("ended", () => setPlayingId(null));
    };
  }, [playingId]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        setIsScrolled(tableContainerRef.current.scrollTop > 0);
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Card
      sx={{
        mb: 2,
        p: "24px 16px 8px 16px",
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Recent Calls
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <FormControl size="small">
          <Select defaultValue="Time Period">
            <MenuItem value="Time Period">Time Period</MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: "flex", gap: 8 }}>
          <TextField
            size="small"
            placeholder="Search name or 10-digit number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton>
            <FilterList />
          </IconButton>
          <IconButton>
            <Download />
          </IconButton>
        </div>
      </div>
      <TableContainer
        ref={tableContainerRef}
        sx={{
          border: "1px solid #ced3da",
          borderRadius: "8px",
          overflowY: "auto",
          height: "calc(100vh - 261px)",
        }}
      >
        <Table stickyHeader>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 10,
              boxShadow: isScrolled
                ? "rgba(49, 53, 61, 0.19) 0px 4px 4px 0px"
                : "none",
              transition: "box-shadow 0.2s ease-in-out",
            }}
          >
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "#6f7780",
                    fontWeight: "400",
                    borderRight:
                      index !== tableHeaders.length - 1
                        ? "1px solid #ced3da"
                        : "none",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <ColorAvatar name={row.initials} />

                    {row.name}
                  </div>
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.result}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.office}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <IconButton onClick={() => handlePlayAudio(row)}>
                      {playingId === row.id ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <LinearProgress
                      variant="determinate"
                      value={progress[row.id] || 0}
                      sx={{
                        width: "100px",
                        backgroundColor: "#b2bec3", // Optional: Set background color
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "black", // Set the progress bar color to black
                        },
                      }}
                    />
                  </div>
                </TableCell>
                {/* Sticky Action Cell */}
                <TableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    background: "#fff",
                    zIndex: 3,
                    boxShadow: isScrolledX
                      ? "-5px 0px 10px rgba(0,0,0,0.1)"
                      : "none",
                  }}
                >
                  <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <FormControl size="small">
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {[10, 25, 50].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <IconButton
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            sx={{ mr: 1 }}
          >
            <ChevronLeft />
          </IconButton>
          <span>Page {page + 1}</span>
          <IconButton
            disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
            onClick={() => setPage(page + 1)}
            sx={{ ml: 1 }}
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />
    </Card>
  );
}

export default RecentCalls;
