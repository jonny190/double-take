module.exports = (sec) => {
  const ms = sec * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
