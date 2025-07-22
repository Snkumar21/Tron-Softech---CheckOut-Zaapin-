require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3003;

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Snkumar30",
    database: process.env.DB_NAME || "zaapin_db"
});

// Connect to DB
db.connect(err => {
    if (err) {
        console.error("MySQL Connection Error:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// 🖼️ File storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "frontend/uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 🟢 Register Route
app.post("/api/register", upload.single("profile_pic"), (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const profilePic = req.file ? req.file.filename : "";

    const query = "INSERT INTO users (name, email, password, phone, address, profile_pic) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [name, email, password, phone, address, profilePic], (err, result) => {
        if (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
        }
        res.json({ success: true, message: "Registered successfully" });
    });
});


// 🟢 User Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Login Error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const user = results[0];
        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    });
});

// 🔍 Get Profile by User ID
app.get("/api/profile/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT name, email, phone, address FROM users WHERE id = ?";

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Profile Error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, profile: results[0] });
    });
});

// 🔴 Logout (Client can clear localStorage/sessionStorage)
app.post("/api/logout", (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
});

// Serve login.html as root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html")); // login
});

app.get("/main.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "main.html")); // dashboard
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});