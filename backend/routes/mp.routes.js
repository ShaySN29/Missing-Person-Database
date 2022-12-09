const express = require("express");
const router = express.Router();
const { addNewMP, updateMissingPerson, deleteMissingPerson, listMissingPersons, listSearchItems } = require("../controllers/mp.controller");

router.post("/addmp", addNewMP);

router.put("/updatemp", updateMissingPerson);

router.delete("/deletemp", deleteMissingPerson);

router.get("/listmp", listMissingPersons);

// router.get("/listsearchmp", listSearchItems); Search route

module.exports = router;