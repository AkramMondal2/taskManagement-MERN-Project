export const validationSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: error.message || "Schema validation fail",
    });
  }
};
