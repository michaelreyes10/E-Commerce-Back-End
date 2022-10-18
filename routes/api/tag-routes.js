const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    //include data from the category model
    include: [
      //include the tag data
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((productTag) => {
      //if no categories were found
      if (!productTag) {
        res.status(404).json({ message: "No Tags found..." });
        return;
      }
      res.json(productTag);
    })
    .catch((err) => {
      //Deal with any errors that occur
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],

    //include data from the category model
    include: [
      //include the tag data
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((productTag) => {
      //if no categories were found
      if (!productTag) {
        res.status(404).json({ message: "No Tags found..." });
        return;
      }
      res.json(productTag);
    })
    .catch((err) => {
      //Deal with any errors that occur
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    //col and their data
    tag_name: req.body.tag_name,
  })
    .then((productTag) => res.json(productTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      //col and their data
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((productTag) => res.json(productTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((productTag) => {
      //if no categories were found
      if (!productTag) {
        res.status(404).json({ message: "No Tags found with this id..." });
        return;
      }
      res.json(productTag);
    })
    .catch((err) => {
      //Deal with any errors that occur
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;