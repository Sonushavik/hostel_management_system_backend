const validate = (schema) => async (req, res, next) => {
  try {
    if (req.user && req.user._id) {
      req.body.userId = req.user._id.toString(); // ensure it's a string if Zod expects it
    }
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };

    console.log(error);
    // res.status(400).json({ msg: message });
    next(error);
  }
};

module.exports = validate;
    