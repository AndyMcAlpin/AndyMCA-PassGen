// Generates password according to conditions
function generatePassword(char, length) {
  password = "";
  const charArr = [char.upper, char.lower, char.number, char.special];

  for (let i = 0; i < length; i++) {
    let x = [Math.floor(Math.random() * 4)];
    if (x == 0 && char.upper == true) {
      password += randomUpper();
    } else if (x == 1 && char.lower == true) {
      password += randomLower();
    } else if (x == 2 && char.number == true) {
      password += randomNumber();
    } else if (x == 3 && char.special == true) {
      password += randomSpecial();
    } else {
      i--;
    }
  }
  checkpass(password, char, length);
}

// Validates generated password to check if it fulfils all conditions
function checkpass(password, char, length) {
  const up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  upArr = up.split("");
  const low = "abcdefghijklmnopqrstuvwxyz";
  lowArr = low.split("");
  const num = "1234567890";
  numArr = num.split("");
  const spec = "!@#$%^&*()+-=_.,><;:?/`~";
  specArr = spec.split("");
  passCharArr = password.split("");

  if (
    (char.upper == false ||
      passCharArr.filter((element) => upArr.includes(element)).length > 0) &&
    (char.lower == false ||
      passCharArr.filter((element) => lowArr.includes(element)).length > 0) &&
    (char.number == false ||
      passCharArr.filter((element) => numArr.includes(element)).length > 0) &&
    (char.special == false ||
      passCharArr.filter((element) => specArr.includes(element)).length > 0)
  ) {
    document.getElementById("final-pass").innerText = password;
  } else {
    generatePassword(char, length);
  }
}
// prompts for selecting password length and chars
function startPrompt() {
  const char = { upper: "", lower: "", number: "", special: "" };
  let passLength = prompt(
    "How long would you like your password?, pick a number between 8 and 128"
  );

  if (passLength >= 129 || passLength <= 7) {
    return startPrompt();
  }

  char.upper = confirm(
    "Do you want upper case characters? Click OK if yes, cancel if no"
  );

  char.lower = confirm(
    "Do you want lower case characters? Click OK if yes, cancel if no"
  );

  char.number = confirm(
    "Do you want number characters? Click OK if yes, cancel if no"
  );

  char.special = confirm(
    "Do you want special characters? Click OK if yes, cancel if no"
  );

  if (
    char.upper == false &&
    char.lower == false &&
    char.number == false &&
    char.special == false
  ) {
    return startPrompt();
  }

  generatePassword(char, passLength);
}

// initializes password generation html button click
document.getElementById("generate").onclick = function () {
  startPrompt();
};

// functions to generate random characters of each type
function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function randomSpecial() {
  const special = "!@#$%^&*()+-=_.,><;:?/`~";
  return special[Math.floor(Math.random() * special.length)];
}
