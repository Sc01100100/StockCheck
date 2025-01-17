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
        alert("Please enter a valid quantity!");
        return;
    }

    const token = localStorage.getItem("Authorization");

    if (!token) {
        alert("You are not logged in. Please log in again.");
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Item restocked successfully!");
        closeRestockPopup(); 
        location.reload(); 
    } catch (error) {
        console.error("Error restocking item:", error);
        alert("Failed to restock the item. Please try again.");
    }
}

window.showRestockPopup = showRestockPopup;
window.closeRestockPopup = closeRestockPopup;
window.submitRestock = submitRestock;