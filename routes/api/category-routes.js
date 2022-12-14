const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ]
})
  .then(products => {
    if (!products) {
      res.status(404).json({ message: 'No products found' });
      return;
    }
    res.json(products);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({

    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    //include data from the producet model
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });


});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    
      //col and their data
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      //if no categories were found
      if (!category) {
        res
          .status(404)
          .json({ message: "No Categories found with this id..." });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      //Deal with any errors that occur
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
