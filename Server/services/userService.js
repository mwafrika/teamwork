import db from '../models/dB';
import Service from '../models/userModel';

class userHelper {
  static signup(userData) {
    if (db.users.find((item) => item.email === userData.email)) return false;
    const newUser = new Service();
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.email = userData.email;
    newUser.password = userData.password;
    newUser.gender = userData.gender;
    newUser.department = userData.department;
    newUser.jobRole = userData.jobRole;
    newUser.isAdmin = userData.isAdmin;
    
    const newUserInput = {
      id: db.users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      department: newUser.department,
      jobRole: newUser.jobRole,
      password: newUser.password,
      gender: newUser.gender,
      isAdmin: newUser.isAdmin,
    };
    db.users.push(newUserInput);

    const userDetails = {
      id: newUserInput.id,
      firstName: newUserInput.firstName,
      lastName: newUserInput.lastName,
      email: newUserInput.email,
      jobRole: newUserInput.jobRole,

    };
    return userDetails;
  }

  static signin(userData) {
    const allData = db.users;
    const findUser = allData.find(((user) => user.email === userData.email && user.password === userData.password));
    if (!findUser) return false;
    const userExist = {
      id: findUser.id,
      firstName: findUser.firsName,
      lastName: findUser.lastName,
      email: findUser.email,
    };
    return userExist;
  }
}
export default userHelper;
