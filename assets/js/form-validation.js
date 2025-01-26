const blockInvalidKeys = (inputId) => {
  const inputElement = document.getElementById(inputId);
  inputElement.addEventListener("keydown", (event) => {
    const invalidKeys = ["-", "+", "e", "E", "."];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  });
};

blockInvalidKeys("item-stock");

function restockInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

function sellInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
