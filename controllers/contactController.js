import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

//@desc Create New contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
  console.log("Body", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
  console.log("Contact", req.params.id);

  const contact = await Contact.findById(req.params.id);
  console.log("Contact exists:", contact !== null);

  if (!contact) {
    console.log("Contact not found");
    res.status(404);
    console.log("Contact not found");
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route POST /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: `Delete contact with id ${req.params.id}`,
  });
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
