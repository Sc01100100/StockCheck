import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTableTransaction } from "../temp/table-transaction.js";

export function filltbTransaction(response) {
    console.log("Filling table with values:", response);

    const values = response.transactions || [];

    if (Array.isArray(values)) {
        const sortedValues = values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        let content = sortedValues.map(value => {
            const formatDate = value.created_at 
                ? new Date(value.created_at).toISOString().substring(0, 10) 
                : "No Date";

            const formattedQuantity = value.type === "IN" 
                ? `+${value.quantity}` 
                : value.quantity;

            const quantityColor = value.type === "IN" ? "text-green-500" : "text-red-500"; 

            return fillTableTransaction
                .replace("#NAME#", value.item_name || "Unnamed")
                .replace("#QYT#", `<span class="${quantityColor} block">${formattedQuantity || "No Quantity"}</span>`)  
                .replace("#TYPE#", value.type || "No Type")
                .replace("#DATE#", formatDate);
        }).join("");

        addInner("fillTransaction", content);
    } else {
        console.error("Invalid data format: expected an array");
    }
}
