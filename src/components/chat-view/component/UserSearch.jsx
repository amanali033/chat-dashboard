import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import ColorAvatar from "../../color-avatar/ColorAvatar";

// const users = [
//   {
//     id: 1,
//     name: "Craig Harff",
//     initials: "CH",
//     gender: "Male",
//     age: 42,
//     status: "Inactive",
//   },
//   {
//     id: 2,
//     name: "William Crane",
//     initials: "WC",
//     gender: "Male",
//     age: 69,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Dovana Crane",
//     initials: "DC",
//     gender: "Female",
//     age: 61,
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "David, Jr. Crane",
//     initials: "DC",
//     gender: "Male",
//     age: 36,
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Craig Brand",
//     initials: "CB",
//     gender: "Male",
//     age: 125,
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Craig Meredith",
//     initials: "CM",
//     gender: "Male",
//     age: 53,
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Craig Lapp",
//     initials: "CL",
//     gender: "Male",
//     age: 61,
//     status: "Active",
//   },
//   {
//     id: 8,
//     name: "Craig Peterson",
//     initials: "CP",
//     gender: "Male",
//     age: 58,
//     status: "Active",
//   },
// ];

const UserSearch = ({ users }) => {
  console.log(" UserSearch ~ users:", users);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box sx={{ padding: "16px", borderBottom: "1px solid #DDE1E5" }}>
      <Autocomplete
        options={users}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedUser(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="To:"
            variant="outlined"
            fullWidth
            size="small"
          />
        )}
        renderOption={(props, option) => (
          <List component="div" {...props} key={option.id}>
            <ListItem button>
              <ListItemAvatar>
                <ColorAvatar name={option?.patient_name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {option.patient_name || "Unknown"}
                  </Typography>
                }
                secondary={`${option.gender || "Male"} • ${option.age} • ${
                  option.status
                }`}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{
                  color: "body1",
                  textTransform: "lowercase",
                  sx: {
                    color: "#424952",
                    fontSize: "0.75rem",
                  },
                }}
              />
            </ListItem>
          </List>
        )}
      />
    </Box>
  );
};

export default UserSearch;
