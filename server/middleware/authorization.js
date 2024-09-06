const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (userId !== parseInt(id)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
