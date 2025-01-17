import { urlGETItems } from "./config/url.js";
import { filltbItems } from "./controller/get-items.js";

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

fetchData(urlGETItems, filltbItems);
