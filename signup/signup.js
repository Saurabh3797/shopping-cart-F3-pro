const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("emailID");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPass");
const signupButton = document.getElementById("signupBtn");

signupButton.addEventListener("click", validateInputs);


function validateInputs() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

if (
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword) {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let isEmailUsed = users.some((user) => user.email === email);
    if (isEmailUsed) {
      alert("Email is already used. Please use a different email.");
      return;
    }

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully");

    window.location.href="../shop/index.html";
  }
   else {
    alert("Please fill all the inputs properly.");
  }
}

