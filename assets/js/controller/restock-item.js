import { urlRestock } from "../config/url_put.js";

export function showRestockPopup(itemId) {
    const popup = document.getElementById("popup-restock");
    popup.dataset.itemId = itemId; 
    popup.classList.remove("hidden"); 
}

export function closeRestockPopup() {
    const popup = document.getElementById("popup-restock");
    popup.classList.add("hidden");
}

export async function submitRestock() {
    const popup = document.getElementById("popup-restock");
    const itemId = popup.dataset.itemId; 
    const quantity = document.getElementById("restock-quantity").value;

    if (!quantity || quantity <= 0) {
        showAlert("Please enter a valid quantity!", "bg-red-500");
        return;
    }

    const token = localStorage.getItem("Authorization");

    if (!token) {
        showAlert("You are not logged in. Please log in again.", "bg-red-500");
        window.location.href = "../pages/signin.html";
        return;
    }

    try {
        const response = await fetch(`${urlRestock}${itemId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: parseInt(quantity, 10) }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error) {
                showAlert(errorData.error, "bg-red-500"); 
            } else {
                showAlert(`Failed to restock item: ${response.statusText}`, "bg-red-500");
            }
            return;
        }

        showAlert("Item restocked successfully!", "bg-green-500");
        closeRestockPopup(); 
        location.reload(); 
    } catch (error) {
        console.error("Error restocking item:", error);
        showAlert("Failed to restock the item. Please try again.", "bg-red-500");
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

window.showRestockPopup = showRestockPopup;
window.closeRestockPopup = closeRestockPopup;
window.submitRestock = submitRestock;