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
        alert("Please enter a valid quantity.");
        return;
    }

    try {
        const token = localStorage.getItem("Authorization");
        if (!token) {
            alert("You are not logged in. Please log in again.");
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
            alert("Item sold successfully!");
            closeSellPopup();
            location.reload(); 
        } else {
            throw new Error(`Failed to sell item: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error selling item:", error);
    }
}

window.showSellPopup = showSellPopup;
window.closeSellPopup = closeSellPopup;
window.submitSell = submitSell;
