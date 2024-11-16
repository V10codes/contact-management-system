import PropTypes from "prop-types";
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactTableItem = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  company,
  jobTitle,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phoneNumber}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

ContactTableItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactTableItem;
