import prisma from "../lib/prisma.js";

// getContacts,
// getContact,
// addContact,
// updateContact,
// deleteContact,

export const addContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !company ||
    !jobTitle
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingUser = await prisma.contact.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists with this email" });
      return;
    }

    const newContact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
      },
    });

    res.status(200).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({});
    if (!contacts || contacts.length == 0) {
      res.status(404).json({ message: "No contacts found" });
      return;
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

export const getContact = async (req, res) => {
  const email = req.body.email;
  try {
    const contact = await prisma.contact.findUnique({
      where: { email: email },
    });
    if (!contact) {
      res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch the contact" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({
      where: { id: id },
    });
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    const updatedData = req.body;
    const updatedContact = await prisma.contact.update({
      where: { id: id },
      data: {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        company: updatedData.company,
        jobTitle: updatedData.jobTitle,
      },
    });

    return res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured updating the contact" });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({
      where: { id: id },
    });
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    const deletedContact = await prisma.contact.delete({
      where: { id: id },
    });
    res
      .status(200)
      .json({ message: "Contact deleted successfully!", deleteContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Contact deleted failed" });
  }
};
