import passport from "passport";
import validator from "validator";
import { User } from "../models/User.js";

// LOGIN CRUD =====================================================

export const getLogin = (req, res) => {
  if (req.user) {
    const userData = {
      id: req.user._id,
      username: req.user.username,
    };

    res.json({ isAuthenticated: true, userData: userData });
  } else {
    res.json({ isAuthenticated: false });
  }
};

export const postLogin = (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.username)) {
    validationErrors.push({ msg: "Username cannot be blank." });
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }

  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid username or password." }], isAuthenticated: false });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true, isAuthenticated: true, message: "Login successful." });
    });
  })(req, res, next);
};

// LOGOUT CRUD =====================================================

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error during logout.", err);
      return res.status(500).json({ error: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.log("Error: Failed to destroy the session during logout.", err);
        return res.status(500).json({ error: "Session destruction failed" });
      }
      res.json({ success: true, message: "Logout successful.", isAuthenticated: false });
    });
  });
};

// SIGNUP CRUD =====================================================

export const getSignup = (req, res) => {
  if (req.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};

export const postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.username)) {
    validationErrors.push({ msg: "Username cannot be blank." });
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match" });
  }

  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ errors: [{ msg: "That username is already taken." }] });
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    await newUser.save();
    req.logIn(newUser, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true, message: "Signup successful." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// DELETE USER ACCOUNT =====================================================

export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log("Error: Failed to destroy the session during logout.", err);
        return res.status(500).json({ error: "Session destruction failed" });
      }
      req.user = null;
      res.json({ success: true, message: "Account deletion successful." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
