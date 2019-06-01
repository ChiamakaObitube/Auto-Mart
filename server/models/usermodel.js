import users from '../database/user';
// const users = [];

class User {
  signup(data) {
    const newUser = {
      id: users.length + 1,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      password: data.password,
      isAdmin: false,
    };
    users.push(newUser);
    return newUser;
  }


  getAllUsers() {
    return users;
  }

  getSpecificUser(email) {
    const specificUser = users.find(user => user.email === email);
    return specificUser;
  }
}


export default new User();
