module.exports = function errorrHandler(error, req, res, next) {
  console.log(error.name);
  //ini default
  let status = error.status || 500;
  let message = error.message || "Internal server error";
  let errors = null;

  console.log(error.name, "Error Name");

  switch (error.name) {
    case "SequelizeValidationError":
      status = 400;
      errors = error.errors.map((err) => err.message);
      message = errors;
      console.log("validation error");
      break;

    //unique email
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      console.log("constraint error");
      break;

    case "EmptyPassword":
      status = 400;
      message = "Password is required!";
      break;

    case "EmptyLogin":
      status = 400;
      message = "Email / Password is required!";
      break;

    case "NotFound":
      status = 404;
      message = "Not Found!";
      break;

    case "InvalidEmail":
      status = 400;
      message = "Invalid email format!";
      break;

    case "InvalidLogin":
      status = 400;
      message = "Incorrect email / password!";
      break;
  }
  res.status(status).json({ message });
};
