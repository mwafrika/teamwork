class Validate {
  /**
   * Check if provided email has a valid email address formatting
   * @param {string} email - email address to be validated
   * @returns {boolean} - true is email is properly formatted, false if otherwise
   * @param {string} length
   * @param {string} escape
   *
   */

  static isEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    return re.test(email.toLowerCase());
  }

  static checkEmpty(input) {
    // const empty = input.trim();
    // if(empty.length<1) return true;
    // return false;
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

  static isNotNumber(name) {
    const re = /[0-9]/g;
    const testName = re.test(name);
    return testName;
  }
}
export default Validate;
