export const createUser = async (req, res) => {
  try {
    await User.create({ username: req.body.username });

    return res.status(StatusCodes.CREATED).json({ msg: "User created!" });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Failed to create new user!",
    });
  }
};
