import { urlSell } from "../config/url_put.js"; 

let sellIdToSell = null;

function showSellPopup(sellId) {
    sellIdToSell = sellId; 
    document.getElementById("popup-sell").classList.remove("hidden");
}

function closeSellPopup() {
    document.getElementById("popup-sell").classList.add("hidden");
}

async function submitSell() {
    const quantity = document.getElementById("sell-quantity").value;

    if (!quantity || quantity <= 0) {
        showAlert("Please enter a valid quantity.", "bg-red-500");
        return;
    }

    try {
        const token = localStorage.getItem("Authorization");
        if (!token) {
            showAlert("You are not logged in. Please log in again.", "bg-red-500");
            window.location.href = "../pages/signin.html";
            return;
        }

        const url = `${urlSell}${sellIdToSell}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: parseInt(quantity, 10) 
            })
        });

        if (response.ok) {
            showAlert("Item sold successfully!", "bg-green-500");
            closeSellPopup();
            location.reload(); 
        } else {
            const errorData = await response.json();
            if (errorData.error) {
                showAlert(errorData.error, "bg-red-500"); 
            } else {
                showAlert(`Failed to sell item: ${response.statusText}`, "bg-red-500");
            }
        }
    } catch (error) {
        console.error("Error selling item:", error);
        showAlert("An unexpected error occurred. Please try again.", "bg-red-500");
    }
}

function showAlert(message, alertClass) {
    const alertBox = document.createElement("div");
    alertBox.className = `fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full p-4 rounded-lg text-white ${alertClass} shadow-lg text-center z-50`;
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000); 
}

window.showSellPopup = showSellPopup;
window.closeSellPopup = closeSellPopup;
window.submitSell = submitSell;