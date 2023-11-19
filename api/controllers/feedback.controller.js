import feedback from "../modules/feedback.module.js";

// create feedback 
export const createFeedback = async (req, res, next) => {
  try {
    const { text, rating, foodMenu } = req.body;
    const userId = req.user.id;

    const newFeedback = await feedback.create({
      text,
      rating,
      user: userId,
      foodMenu,
    });

    if (!newFeedback) {
      return res.json({
        message: "feedback wasn't created!",
        status: 400,
      });
    }

    res.json({
      status: 200,
      message: "feedback creation succesfuly!",
      newFeedback,
    });
  } catch (err) {
    next(err);
  }
};


// update feedback by id
export const updateFeedback = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;
    const { text, rating } = req.body;
    const updating = await feedback.findByIdAndUpdate(feedbackId, {
      text: text,
      rating: rating,
    },
    {new: true}
    );
    if (!updating) {
        return res.json({
          status: 404,
          message: "feedback not found",
        });
      }
  
      res.json({
        status: 200,
        message: "feedback successfully updated",
        updating,
      });
  
  } catch (err) {
    next(err);
  }
};


// get unique feedback by id

export const getUniqueFeedback = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;

    const uniqueFeedback = await feedback.findById(feedbackId);

    if (!uniqueFeedback) {
      return res.json({
        status: 404,
        message: "Feedback not found",
      });
    }

    res.json({
      status: 200,
      uniqueFeedback,
    });

  } catch (err) {
    next(err);
  }
};

// get all feedbacks
export const getAllFeedbacks = async (req, res, next) => {
  try {
    const allFeedbacks = await feedback.find();

    res.json({
      status: 200,
      allFeedbacks,
    });

  } catch (err) {
    next(err);
  }
};


// delete feedback by id
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;

    const deletedFeedback = await feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.json({
        status: 404,
        message: "Feedback not found",
      });
    }

    res.json({
      status: 200,
      message: "Feedback successfully deleted",
      deletedFeedback,
    });

  } catch (err) {
    next(err);
  }
};

