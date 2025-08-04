const validate = (schema) => async (req, res, next) => {
  try {
    if (req.user && req.user._id) {
      req.body.userId = req.user._id.toString(); 
    }

    if (req.files) {
      Object.keys(req.files).forEach((fieldName) => {
        req.body[fieldName] = req.files[fieldName][0]?.filename || '';
      });
    }

    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";

    const extraDetails = err?.errors?.[0]?.message || err.message || "Validation error";

    const error = {
      status,
      message,
      extraDetails,
    };

    console.error("Validation failed:", error);
    return res.status(status).json(error);
  }
};


module.exports = validate;
    