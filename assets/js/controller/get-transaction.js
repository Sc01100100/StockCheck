import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTableTransaction } from "../temp/table-transaction.js";

export function filltbTransaction(response) {
    console.log("Filling table with values:", response);

    const values = response.transactions || [];

    if (Array.isArray(values)) {
        const filterMonthInput = document.getElementById("filterMonth").value;
        console.log("Selected filter month:", filterMonthInput);

        let filteredValues = values;

        if (filterMonthInput) {
            const [year, month] = filterMonthInput.split("-");
            console.log("Year:", year, "Month:", month);

            filteredValues = values.filter(value => {
                if (value.created_at) {
                    const transactionDate = new Date(value.created_at);
                    const isMatching = (
                        transactionDate.getFullYear() === parseInt(year, 10) &&
                        (transactionDate.getMonth() + 1) === parseInt(month, 10)
                    );
                    console.log("Transaction date:", value.created_at, "Is matching?", isMatching);
                    return isMatching;
                }
                return false;
            });
        }

        console.log("Filtered values:", filteredValues);

        const sortedValues = filteredValues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
