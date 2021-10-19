import express, { json } from "express";
import uniqid from "uniqid";
import { dirname, join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);

const currentDir = dirname(currentFilePath);
console.log(currentDir);

const dataPath = join(currentDir, "authors.json");

authorsRouter.get("/", (req, res) => {
  const getData = readFileSync(dataPath);
  console.log(getData);
  const authorsData = JSON.parse(getData);
  console.log(authorsData);
  res.send(authorsData);
});

authorsRouter.get("/:id", (req, res) => {
  const getData = readFileSync(dataPath);
  const dataAsArray = JSON.parse(getData);
  const getAuthor = dataAsArray.find((author) => author.Id === req.params.id);
  console.log(getAuthor);
  res.send(getAuthor);
});

authorsRouter.post("/", (req, res) => {
  const { name, surname, email } = req.body;
  const newData = {
    Id: uniqid(),
    name,
    surname,
    email,
    avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const authors = JSON.parse(readFileSync(dataPath));
  authors.push(newData);
  writeFileSync(dataPath, JSON.stringify(authors));
  res.send({ name: newData.name });
});

authorsRouter.put("/:id", (req, res) => {
  const authors = JSON.parse(readFileSync(dataPath));
  let remainingAuthors = authors.filter(
    (author) => author.id !== req.params.id
  );

  let changedAuthor = { ...req.body, id: req.params.id };
  remainingAuthors.push(changedAuthor);
  res.send(changedAuthor);
});

authorsRouter.delete("/:id", (req, res) => {
  const authors = JSON.parse(readFileSync(dataPath));

  const deleteAuthor = authors.filter((author) => author.id !== req.params.id);
  writeFileSync(dataPath, JSON.stringify(deleteAuthor));
  res.send("deleted");
});

export default authorsRouter;
