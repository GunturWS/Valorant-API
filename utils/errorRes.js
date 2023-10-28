export const errorClient = (res) => {
  return res.status(404).json({
    status: "error",
    message: "bad request from client",
  });
};

export const errorServer = (res, err) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
