let isLoggedIn = false;
let logoutTimer;

const submitRegForm = (event) => {
  event.preventDefault();

  var firstName = event.target.elements.firstname.value;
  var lastName = event.target.elements.lastname.value;
  var email = event.target.elements.email.value;
  var password = event.target.elements.password.value;
  var isNewsletterChecked = event.target.elements.newsletter.checked;
  var isAgreed = event.target.elements.termsOfUse.checked;

  fetch("http://localhost:3001/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isNewsletterChecked: isNewsletterChecked,
      isAgreed: isAgreed,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error: ", error));
};

const signIn = (event) => {
  event.preventDefault();
  var username = event.target.elements.username.value;
  var password = event.target.elements.password.value;
  var user;

  console.log(username);
  console.log(password);
  fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      user = data;
      localStorage.setItem("loggedInUser", user);
      loggedInUser();
    })
    .catch((error) => console.error("Error: ", error));
};

const logOut = () => {
  localStorage.removeItem("loggedInUser");
  isLoggedIn = false;

  clearTimeout(logoutTimer);
  console.log("Logged out successfully!");
  window.location.href = "/client/index.html";
};

const startLogoutTimer = () => {
  clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {
    logOut();
    console.log("Logged out due to inactivity");
  }, 10 * 60 * 1000);
};

const resetLogoutTimer = () => {
  startLogoutTimer();
};

window.addEventListener("mousemove", resetLogoutTimer);
window.addEventListener("keypress", resetLogoutTimer);

const loggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");
  isLoggedIn = true;
  console.log(`Welcome back ${user.firstName}`);
  window.location.href = "/client/index.html";
};

window.onload = () => {
  const loginContent = document.getElementById("login-content");
  const loggedInContent = document.getElementById("loggedIn-content");

  if (localStorage.getItem("loggedInUser")) {
    loginContent.style.display = "none";
    loggedInContent.style.display = "block";
  } else {
    loginContent.style.display = "flex";
    loggedInContent.style.display = " none";
  }
};

const displayShopCat = (id) => {
  const coffeeContent = document.getElementById("coffee");
  const milkteaContent = document.getElementById("milktea");
  const foodContent = document.getElementById("food");
  const merchContent = document.getElementById("merch");

  if (id == "coffee-cat") {
    coffeeContent.style.display = "block";
    milkteaContent.style.display = "none";
    foodContent.style.display = "none";
    merchContent.style.display = "none";
  } else if (id == "milktea-cat") {
    coffeeContent.style.display = "none";
    milkteaContent.style.display = "block";
    foodContent.style.display = "none";
    merchContent.style.display = "none";
  } else if (id == "food-cat") {
    coffeeContent.style.display = "none";
    milkteaContent.style.display = "none";
    foodContent.style.display = "block";
    merchContent.style.display = "none";
  } else {
    coffeeContent.style.display = "none";
    milkteaContent.style.display = "none";
    foodContent.style.display = "none";
    merchContent.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Get all list items
  var listItems = document.querySelectorAll("#list li");

  // Loop through list items to add click event listener to each
  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Retrieve the ID attribute
      var id = this.id;
      displayShopCat(id);
    });
  });
});
