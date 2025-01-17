import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTableItems } from "../temp/table-items.js";
import { deleteItem } from "../controller/delete-items.js";

export function filltbItems(response) {
    console.log("Filling table with values:", response);

    const values = response.items || [];

    if (Array.isArray(values)) {
        const sortedValues = values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        let content = sortedValues.map(value => {
            const formatDate = value.created_at ? new Date(value.created_at).toISOString().substring(0, 10) : "No Date";

            let itemContent = fillTableItems
                .replace("#NAME#", value.name || "Unnamed")
                .replace("#DESC#", value.description || "No Description")
                .replace("#STOCK#", value.stock != null ? value.stock : "0")
                .replace("#DATE#", formatDate)
                .replace("#ITEM_ID#", value.id)
                .replace("#SELL_ID#", value.id);  

            itemContent = itemContent.replace(
                "#DELETE_BTN#",
                `<button data-id="${value.id}" class="delete-btn bg-gray-500 text-white px-3 py-1 text-sm rounded hover:bg-gray-600 transition sm:px-4 sm:py-2 sm:text-base">Delete</button>`
            );

            return itemContent;
        }).join(""); 

        addInner("fillitems", content);

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async (e) => {
                const itemId = e.target.getAttribute("data-id");
                if (confirm("Are you sure you want to delete this item?")) {
                    try {
                        await deleteItem(itemId);
                        alert("Item deleted successfully!");
                        location.reload(); 
                    } catch (error) {
                        console.error("Error deleting item:", error);
                        alert("Failed to delete item. Please try again.");
                    }
                }
            });
        });
    } else {
        console.error("Invalid data format: expected an array");
    }
}
