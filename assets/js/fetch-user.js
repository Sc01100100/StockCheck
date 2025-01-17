document.addEventListener("DOMContentLoaded", () => {
  const totalItemsElement = document.getElementById("total-items");
  const itemsInElement = document.getElementById("items-in");
  const itemsOutElement = document.getElementById("items-out");
  const userNameElement = document.getElementById("userName");

  const token = localStorage.getItem("Authorization");

  if (!token) {
    alert("You are not logged in. Redirecting to login page.");
    window.location.href = "../pages/signin.html";
    return;
  }

  fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/user/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received from user info API:", data);
      if (data && data.status === "success") {
        userNameElement.textContent = data.data.name || "User"; 
      } else {
        alert(data.message || "Failed to fetch user data.");
        localStorage.removeItem("Authorization");
        window.location.href = "../pages/signin.html";
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data. Please try again later.");
    });

  fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/items", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received from total items API:", data);
      if (data && data.status === "success" && Array.isArray(data.items)) {
        totalItemsElement.textContent = data.items.length || "0";  
      } else {
        alert(data.message || "Failed to fetch total items.");
      }
    })
    .catch((error) => {
      console.error("Error fetching total items:", error);
      alert("An error occurred while fetching total items. Please try again later.");
    });

  fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/txitems", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received from transaction API:", data);
      if (data && data.status === "success" && Array.isArray(data.transactions)) {
        const itemsIn = data.transactions.filter(tx => tx.type === "IN");
        const itemsOut = data.transactions.filter(tx => tx.type === "OUT");

        const totalIn = itemsIn.reduce((acc, tx) => acc + tx.quantity, 0);
        const totalOut = itemsOut.reduce((acc, tx) => acc + tx.quantity, 0);

        itemsInElement.textContent = totalIn || "0";  
        itemsOutElement.textContent = totalOut || "0";  
      } else {
        alert(data.message || "Failed to fetch transaction data.");
      }
    })
    .catch((error) => {
      console.error("Error fetching transaction data:", error);
      alert("An error occurred while fetching transaction data. Please try again later.");
    });
});
