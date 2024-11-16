import { useEffect, useState } from "react";
import ContactTableItem from "./ContactTableItem";
import { Link } from "react-router-dom";
import dummyData from "../lib/dummyData.js";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import apiRequest from "../lib/apiRequest";

const ContactTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contacts, setContacts] = useState([]);
  const [deleteContact, setDeleteContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(null);
  useEffect(() => {
    try {
      const fetchContacts = async () => {
        const response = await apiRequest.get("/api/contacts");
        if (response.status == 200) {
          console.log(response.data);
          setContacts(response.data);
        } else {
          console.log({ message: "Contacts failed to get fetched" });
        }
      };
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRequestSort = (property) => {
    let isAsc = false;
    if (orderBy === property && order === "asc") {
      isAsc = true;
    }
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (contact) => {
    setOpenDialog(true);
    setDeleteContact(contact);
  };

  const handleEdit = (contact) => {
    setOpenEditDialog(true);
    setEditContact(contact);
  };
  const confirmDelete = async () => {
    try {
      const response = await apiRequest.delete(
        `/api/contacts/${deleteContact.id}`
      );
      if (response.status == 200) {
        setContacts((prevContacts) =>
          prevContacts.filter((c) => c.email !== deleteContact.email)
        );
      }
      console.log("Contact deleted successfully");
    } catch (error) {
      console.log("Error deleting contact", error);
    } finally {
      setOpenDialog(false);
      setDeleteContact(null);
    }
  };
  const sortedData = contacts.sort((a, b) => {
    const comparison =
      order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);

    return comparison;
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "50px",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Contact Information
          <Button variant="contained" color="primary">
            <Link
              to="/form"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Add Contact
            </Link>
          </Button>
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "firstName"}
                    direction={orderBy === "firstName" ? order : "asc"}
                    onClick={() => handleRequestSort("firstName")}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "lastName"}
                    direction={orderBy === "lastName" ? order : "asc"}
                    onClick={() => handleRequestSort("lastName")}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element) => (
                  <ContactTableItem
                    key={element.email}
                    firstName={element.firstName}
                    lastName={element.lastName}
                    email={element.email}
                    phoneNumber={element.phoneNumber}
                    company={element.company}
                    jobTitle={element.jobTitle}
                    onEdit={() => handleEdit(element)}
                    onDelete={() => handleDelete(element)}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dummyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ padding: "16px" }}
        />
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-contact-dialog-title"
      >
        <DialogTitle id="delete-contact-dialog-title">
          Delete Contact
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        aria-labelledby="edit-contact-dialog-title"
      >
        <DialogTitle id="edit-contact-dialog-title">Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            name="firstName"
            value={editContact?.firstName || ""}
            onChange={(e) =>
              setEditContact((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            name="lastName"
            value={editContact?.lastName || ""}
            onChange={(e) =>
              setEditContact((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          {/* <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={editContact?.email || ""}
            onChange={(e) =>
              setEditContact((prev) => ({ ...prev, email: e.target.value }))
            }
          /> */}
          <TextField
            fullWidth
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            value={editContact?.phoneNumber || ""}
            onChange={(e) =>
              setEditContact((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Company"
            name="company"
            value={editContact?.company || ""}
            onChange={(e) =>
              setEditContact((prev) => ({ ...prev, company: e.target.value }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Job Title"
            name="jobTitle"
            value={editContact?.jobTitle || ""}
            onChange={(e) =>
              setEditContact((prev) => ({ ...prev, jobTitle: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await apiRequest.put(
                  `/api/contacts/${editContact.id}`,
                  editContact
                );
                if (response.status === 200) {
                  setContacts((prev) =>
                    prev.map((c) =>
                      c.id === editContact.id ? { ...editContact } : c
                    )
                  );
                  console.log("Contact updated successfully");
                }
              } catch (error) {
                console.error("Error updating contact:", error);
              } finally {
                setOpenEditDialog(false);
                setEditContact(null);
              }
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactTable;
