import express from "express";
import next from "next";

const port = process.env.PORT || "8080";
const dev = process.env.NODE_ENV !== "production";
const server = express();
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  server.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, () => {
    console.log("Listening on http://localhost:", port);
  });
});
