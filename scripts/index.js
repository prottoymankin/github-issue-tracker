const nameInput = document.querySelector("#name-input");
const passwordInput = document.querySelector("#password-input");
const signInBtn = document.querySelector("#sign-in-btn");

signInBtn.addEventListener("click", () => {
  const username = nameInput.value;
  const password = passwordInput.value;

  if (!username || !password) return;
  
  if (username.trim() === "admin" && password === "admin123") {
    window.location.assign("./homepage.html");
  }
});