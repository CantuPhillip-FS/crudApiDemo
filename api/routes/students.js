const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");
const protectedRoute = passport.authenticate("jwt", { session: false });
const router = express.Router();
const Student = require("../models/student");
// RESTFUL Endpoints
// GET, POST, PATCH, DELETE

const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student === null) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
};

// GET ALL
router.get("/", protectedRoute, async (_req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE
router.get("/:id", getStudent, async (_req, res) => {
  try {
    res.json(res.student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST CREATE
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH UPDATE
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.class != null) {
    res.student.class = req.body.class;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getStudent, async (_req, res) => {
  try {
    await res.student.deleteOne();
    res.json({ message: "Removed student" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
