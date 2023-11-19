import FoodMenu from "../modules/food.model.js";

// create Food menu
export const createFood = async (req, res, next) => {
  try {
      const { title, description, price, image, dietaryInfo } = req.body;
      const userId = req.user.id;
      const role = req.user.role;
    // check user role
    if (role !== "owner") {
        return res.json({
          message: "Role must be owner",
        });
      }
      

    const newFoodMenu = new FoodMenu({
      title,
      description,
      price,
      image,
      dietaryInfo,
      user: userId,
    });

    if (!newFoodMenu) {
      return res.json({
        status: 400,
        message: "Food menu wasn't created",
      });
    }

    await newFoodMenu.save();
    res.json({
      status: 200,
      message: "Food menu succesfuly created",
      newFoodMenu,
    });
  } catch (err) {
    next(err);
  }
};


// update food menu 

export const updateFood = async (req, res, next) => {
    try {
      const { title, description, price, image, dietaryInfo } = req.body;
      const foodId = req.params.id;
      const role = req.user.role;
      
        // check user role
    if (role !== "owner") {
        return res.json({
          message: "Role must be owner",
        });
      }

      const updatedFoodMenu = await FoodMenu.findByIdAndUpdate(
        foodId,
        {
          title,
          description,
          price,
          image,
          dietaryInfo,
        },
        { new: true }
      );
  
      if (!updatedFoodMenu) {
        return res.json({
          status: 404,
          message: "Food menu not found",
        });
      }
  
      res.json({
        status: 200,
        message: "Food menu successfully updated",
        updatedFoodMenu,
      });
    } catch (err) {
      next(err);
    }
  };


//   get curent food menu

export const Food = async (req, res, next) => {
    try {
      const foodId = req.params.id;
  
      const currentFoodMenu = await FoodMenu.findById(foodId);
  
      if (!currentFoodMenu) {
        return res.json({
          status: 404,
          message: "Food menu not found",
        });
      }
  
      res.json({
        status: 200,
        currentFoodMenu,
      });
    } catch (err) {
      next(err);
    }
  };

// get all food menu   

  export const getAllFood = async (req, res, next) => {
    try {
      const allFoodMenus = await FoodMenu.find();
  
      res.json({
        status: 200,
        allFoodMenus,
      });
    } catch (err) {
      next(err);
    }
  };

//  delete food menu
  export const deleteFood = async (req, res, next) => {
    try {
      const foodId = req.params.id;
      const role = req.user.role;
      
      // check user role
  if (role !== "owner") {
      return res.json({
        message: "Role must be owner",
      });
    }
      const deletedFoodMenu = await FoodMenu.findByIdAndDelete(foodId);
  
      if (!deletedFoodMenu) {
        return res.json({
          status: 404,
          message: "Food menu not found",
        });
      }
  
      res.json({
        status: 200,
        message: "Food menu successfully deleted",
        deletedFoodMenu,
      });
    } catch (err) {
      next(err);
    }
  };


