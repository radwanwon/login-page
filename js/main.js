// اشكال ال regex
const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one letter, one number, and 8 characters long

// لمسح رسالة الخطا
function clearErrorMessage(errorElement) {
  errorElement.textContent = "";
}

document.getElementById("signUpName").addEventListener("input", function () {
  clearErrorMessage(document.getElementById("signUpNameError"));
  validateInput(
    this,
    nameRegex,
    "Please enter a valid name.",
    document.getElementById("signUpNameError")
  );
});

document.getElementById("signUpEmail").addEventListener("input", function () {
  clearErrorMessage(document.getElementById("signUpEmailError"));
  validateInput(
    this,
    emailRegex,
    "Please enter a valid email.",
    document.getElementById("signUpEmailError")
  );
});

document
  .getElementById("signUpPassword")
  .addEventListener("input", function () {
    clearErrorMessage(document.getElementById("signUpPasswordError"));
    validateInput(
      this,
      passwordRegex,
      "Password must be at least 8 characters long and contain at least one letter and one number.",
      document.getElementById("signUpPasswordError")
    );
  });

document.getElementById("signInEmail").addEventListener("input", function () {
  clearErrorMessage(document.getElementById("signInEmailError"));
  validateInput(
    this,
    emailRegex,
    "Please enter a valid email.",
    document.getElementById("signInEmailError")
  );
});

document
  .getElementById("signInPassword")
  .addEventListener("input", function () {
    clearErrorMessage(document.getElementById("signInPasswordError"));
    validateInput(
      this,
      passwordRegex,
      "Password must be at least 8 characters long and contain at least one letter and one number.",
      document.getElementById("signInPasswordError")
    );
  });

document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signUpName");
    const email = document.getElementById("signUpEmail");
    const password = document.getElementById("signUpPassword");

    // التحقق اذا كانت ال inputs فارغة 
    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      password.value.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please complete the registration information.",
      });
      return;
    }

    // التحقق من ال inputs
    if (
      !validateInput(
        name,
        nameRegex,
        "Please enter a valid name.",
        document.getElementById("signUpNameError")
      )
    )
      return;
    if (
      !validateInput(
        email,
        emailRegex,
        "Please enter a valid email.",
        document.getElementById("signUpEmailError")
      )
    )
      return;
    if (
      !validateInput(
        password,
        passwordRegex,
        "Password must be at least 8 characters long and contain at least one letter and one number.",
        document.getElementById("signUpPasswordError")
      )
    )
      return;

    // التحقق من الاميل مسجل من قبل ام لا
    if (localStorage.getItem(email.value)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This email is already registered.",
      });
      return;
    }

    // حفظ الداتا في localstorage
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    localStorage.setItem(email.value, JSON.stringify(user));
    Swal.fire({
      icon: "success",
      title: "Account created successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    document.getElementById("signUpForm").reset();

    // للتحويل عندما يتم التسجيل بنجاح
    document.querySelector(".container").classList.remove("right-panel-active");
  });


  document
  .getElementById("signInForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signInEmail");
    const password = document.getElementById("signInPassword");

    // التحقق اذا لم يدخل اليوزر معلومات
    if (email.value.trim() === "" || password.value.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please complete the login information.",
      });
      return;
    }

    // التحقق من inputs
    if (
      !validateInput(
        email,
        emailRegex,
        "Please enter a valid email.",
        document.getElementById("signInEmailError")
      )
    )
      return;
    if (
      !validateInput(
        password,
        passwordRegex,
        "Password must be at least 8 characters long and contain at least one letter and one number.",
        document.getElementById("signInPasswordError")
      )
    )
      return;

    // التحقق من الاميل والباسورد
    const user = JSON.parse(localStorage.getItem(email.value));
    if (user && user.password === password.value) {
      document.getElementById("container").innerHTML = `
             <div class="d-flex flex-column justify-content-center align-items-center pt-5">
             <h1 class="py-5">Welcome ${user.name}!</h1>
             <button id="signOutBtn">Sign Out</button>
             </div>
         `;
      document
        .getElementById("signOutBtn")
        .addEventListener("click", function () {
          location.reload();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    }
  });

function validateInput(input, regex, errorMessage, errorElement) {
  if (input.value.trim() === "") {
    input.classList.remove("is-valid", "is-invalid");
    errorElement.textContent = "";
    return false;
  }
  if (!regex.test(input.value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    errorElement.textContent = errorMessage;
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorElement.textContent = "";
    return true;
  }
}

// للتحويل بين الصفحتين
document.getElementById("signIn").addEventListener("click", function () {
  document.querySelector(".container").classList.remove("right-panel-active");
});

document.getElementById("signUp").addEventListener("click", function () {
  document.querySelector(".container").classList.add("right-panel-active");
});
