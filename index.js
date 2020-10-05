const express = require("express");
const path = require("path");
const firebase = require("firebase");
require("firebase/firestore");

//check if there is env port available, if not then run on port 8000
const PORT = process.env.PORT || "8000";
const app = express();

// static file routing
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
