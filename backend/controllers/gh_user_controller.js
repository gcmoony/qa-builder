export const createUser = async (req, res) => {
  try {
    await User.create({ username: req.body.username });

    return res.json({ msg: "User created!", statusCode: StatusCodes.CREATED });
  } catch (error) {
    return res.json({
      msg: "Failed to create new user!",
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};
