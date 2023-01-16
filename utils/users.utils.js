const formatUserForDB = (userObj) => {
  const newUser = {
    email: userObj.email,
    password: userObj.password,
    name: userObj.name,
    address: userObj.address,
    phone: userObj.phone,
    picture: userObj.picture,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
};
