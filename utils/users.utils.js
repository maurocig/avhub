const formatUserForDB = (userObj) => {
  const newUser = {
    email: userObj.email,
    password: userObj.password,
    name: userObj.name,
    address: userObj.address,
    age: userObj.age,
    phone: userObj.phone,
    image: userObj.image,
    cart: userObj.cart,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
};
