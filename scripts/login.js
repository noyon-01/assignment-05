document.getElementById("signin_btn").addEventListener("click", () => {
  const userInput = document.getElementById("user_Input");
  const userName = userInput.value;

  const login_password = document.getElementById("login_password");
  const userPassword = login_password.value;

  if (userName === "admin" && userPassword === "admin123") {
    window.location.assign("./home.html");
  } else {
    alert("Login Failed");
    return;
  }
});
