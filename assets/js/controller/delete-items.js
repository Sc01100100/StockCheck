export async function deleteItem(itemId) {
    const token = localStorage.getItem("Authorization");

    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html";
        return;
    }

    try {
        const response = await fetch(`https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Item deleted successfully!");
        location.reload(); 
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

window.deleteItem = deleteItem;
