import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

let students = {};

let taskList = {
  1: { title: "Task1", description: "Create Express Server" },
  2: { title: "Task2", description: "Practice HTTPS Methods" },
  3: { title: "Task3", description: "Learn Middleware" },
};

app.get("/", (req, res) => {
  console.log("App Token:", process.env.APP_TOKEN);
  console.log("DB Password:", process.env.DB_PASSWORD);
  res.send("Hello World!");
});

app.get("/tasks", (req, res) => {
  res.json(taskList);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskList[id];
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (students[email]) {
    if (students[email] === password) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  }

  students = { ...students, [email]: password };
  res.json({ message: "User registered successfully" });
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (taskList[id]) {
    delete taskList[id];
    res.json({ message: `Task ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
