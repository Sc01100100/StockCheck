import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOSTItems } from "../config/url-post.js";

function postDataWithAuth(url, data, callback) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      showAlert("You are not logged in. Please log in again.", "error");
      setTimeout(() => {
        window.location.href = "../pages/signin.html";
      }, 2000);
      return;
    }
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
  
        if (data.message && data.message.toLowerCase().includes("success")) {
          showAlert("Data submitted successfully!", "success");
  
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          showAlert(data.message || "Failed to submit data. Please try again.", "error");
        }
  
        if (typeof callback === "function") {
          callback(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showAlert("An error occurred while submitting data. Please try again.", "error");
      });
  }

function pushData(event) {
  event.preventDefault();

  const name = getValue("item-name");
  const description = getValue("item-description");
  const stock = parseInt(getValue("item-stock"), 10);

  if (!name || !description || isNaN(stock)) {
    showAlert("Please fill in all fields correctly.", "error");
    return;
  }

  const data = {
    name: name,
    description: description,
    stock: stock,
  };

  console.log("Data to send:", data);

  postDataWithAuth(urlPOSTItems, data, (response) => {
    console.log("Server response:", response);
  });
}

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-items");

  if (!alertContainer) {
    console.error("Alert container not found in the DOM.");
    return;
  }

  const alert = document.createElement("div");
  alert.className = `
    px-4 py-3 rounded-md shadow-lg
    ${
      type === "success"
        ? "bg-green-100 text-green-700 border border-green-400"
        : "bg-red-100 text-red-700 border border-red-400"
    }
  `;
  alert.textContent = message;

  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

onClick("button-transaction", pushData);
