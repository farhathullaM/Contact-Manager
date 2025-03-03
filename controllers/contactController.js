import asyncHandler from "express-async-handler";

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
  res.status(201).json({
    status: "Create New contact",
  });
});

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    msg: "Get all contacts",
  });
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: `Get contact with id ${req.params.id}`,
  });
});

//@desc Update contact
//@route POST /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: `Update contact with id ${req.params.id}`,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: `Delete contact with id ${req.params.id}`,
  });
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
