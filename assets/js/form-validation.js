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

const incomeAmountInput = document.getElementById("am");

incomeAmountInput.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

const amountInput = document.getElementById("tx");

amountInput.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

const amInput = document.getElementById("am2");

amInput.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

const am3Input = document.getElementById("am23");

am3Input.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

const am2Input = document.getElementById("am22");

am2Input.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

function restockInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

function sellInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
