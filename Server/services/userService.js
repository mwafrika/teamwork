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
      password: newUserInput.password,
      isAdmin: newUserInput.isAdmin,
      jobRole: newUserInput.jobRole,

    };
    return userDetails;
  }
}
export default userHelper;
