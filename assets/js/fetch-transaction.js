import { urlGETTX } from "./config/url.js";
import { filltbTransaction } from "./controller/get-transaction.js";

async function fetchData(url, callback) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html"; 
        return;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log("API response status:", response.status); 

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from API:", data); 
        callback(data); 
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("filterButton").addEventListener("click", () => {
    const filterMonthInput = document.getElementById("filterMonth").value;

    if (!filterMonthInput) {
        alert("Please select a valid month to filter.");
        return;
    }

    const selectedMonth = filterMonthInput;

    fetchData(urlGETTX, (response) => {
        const transactions = response.transactions || [];

        const filteredTransactions = transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.created_at).toISOString().slice(0, 7);
            return transactionMonth === selectedMonth;
        });

        const itemsIn = filteredTransactions.filter(tx => tx.type === "IN");
        const itemsOut = filteredTransactions.filter(tx => tx.type === "OUT");

        const totalItemsIn = itemsIn.reduce((total, tx) => total + tx.quantity, 0);
        const totalItemsOut = itemsOut.reduce((total, tx) => total + tx.quantity, 0);

        document.getElementById("items-in").textContent = totalItemsIn || "0";
        document.getElementById("items-out").textContent = totalItemsOut || "0";

        const transactionContainer = document.getElementById("fillTransaction");
        if (transactionContainer) {
            transactionContainer.innerHTML = '';
        }

        if (filteredTransactions.length === 0) {
            document.getElementById("fillTransaction").innerHTML = "";
            document.getElementById("fillTransaction").style.display = "block";
        } else {
            filltbTransaction({ transactions: filteredTransactions });
        }
    });
});

fetchData(urlGETTX, filltbTransaction);
