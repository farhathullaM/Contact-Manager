import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

//@desc Create New contact
//@route POST /api/contacts
//@access Private
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
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find(({ user_id: req.user.id }));
  res.status(200).json(contact);
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Private
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
//@access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("Contact exists:", contact !== null);
  
  // ✅ Prevent further execution if contact is not found
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  // ✅ Ensure req.user exists before checking authorization
  if (!req.user || contact.user_id.toString() !== req.user.id) {
    return res.status(403).json({ error: "User not authorized to update this contact" });
  }


  // ✅ Add runValidators: true to enforce schema validation on updates
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedContact);
});


const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized to delete this contact");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: `Delete contact with id ${req.params.id}`,
  });
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
