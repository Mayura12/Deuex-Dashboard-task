const tableViewIcon = document.getElementById("table-view");
const cardViewIcon = document.getElementById("card-view");
const productCardBody = document.getElementById("product-card-body");
const productTable = document.getElementById("product-table");

tableViewIcon.classList.add("active-tab");
productCardBody.classList.add("hidden");
productTable.classList.remove("hidden");

tableViewIcon.addEventListener("click", () => {
  productCardBody.classList.add("hidden");
  productTable.classList.remove("hidden");
  tableViewIcon.classList.add("active-tab");
  cardViewIcon.classList.remove("active-tab");
});

cardViewIcon.addEventListener("click", () => {
  productTable.classList.add("hidden");
  productCardBody.classList.remove("hidden");
  cardViewIcon.classList.add("active-tab");
  tableViewIcon.classList.remove("active-tab");
});

// Sample data array for products
const products = [
  {
    id: "01",
    name: "Bluetooth Speaker",
    date: "22/07/2024",
    status: "✔️",
    color: "Red, Blue",
    price: 4500,
    quantity: 3,
    amount: 13500,
  },
  {
    id: "02",
    name: "Wireless Earbuds",
    date: "22/07/2024",
    status: "✖",
    color: "White, Blue",
    price: 8000,
    quantity: 1,
    amount: 854000,
  },
  {
    id: "03",
    name: "Wireless Earbuds",
    date: "22/07/2024",
    status: "✖",
    color: "White, Blue",
    price: 8000,
    quantity: 1,
    amount: 843000,
  },
  {
    id: "04",
    name: "Wireless Earbuds",
    date: "22/07/2024",
    status: "✖",
    color: "White, Blue",
    price: 8000,
    quantity: 1,
    amount: 802200,
  },
];

function populateProductCards() {
  const productCardBody = document.getElementById("product-card-body");
  productCardBody.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
        <div class="product-header">
          <div class="card-title">
            ${
              product.name
            } <div class="tooltip"><img src="./tooltip-icon.svg" alt="icon" /> <span class="tooltiptext"><div class="tootip-title">Product Description</div><br/>Portable speaker with powerful sound and long battery life.</span> </div>

          </div>
          <div class="actions">
            <button class="edit-btn">
              <img src="./edit-icon.svg" alt="edit" />
            </button>
            <button class="delete-btn" data-id="${product.id}">
              <img src="./delete-icon.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="product-details">
          <div class="left-side">
            <div>
              <span class="title-cards-details">ID</span>
              <span class="data-cards-details">${product.id}</span>
            </div>
            <div>
              <span class="title-cards-details">Status</span>
              <span class="status ${
                product.status === "✔️" ? "success" : "fail"
              }"">${product.status}</span>
            </div>
            <div>
              <span class="title-cards-details">Quantity</span>
              <span class="data-cards-details">${product.quantity}</span>
            </div>
            <div>
              <span class="title-cards-details">Amount</span>
              <span class="data-cards-details">${product.amount}</span>
            </div>
          </div>
          <div class="right-side">
            <div>
              <span class="title-cards-details">Product Date</span>
              <span class="data-cards-details">${product.date}</span>
            </div>
            <div>
              <span class="title-cards-details">Color Option</span>
              <span class="data-cards-details">${product.color}</span>
            </div>
            <div>
              <span class="title-cards-details">Price</span>
              <span class="data-cards-details">${product.price}</span>
            </div>
          </div>
        </div>
      `;

    productCardBody.appendChild(productCard);
  });
  setupDeleteButtons();
}

function populateProductTable() {
  const productTableBody = document.querySelector("#product-table tbody");
  productTableBody.innerHTML = "";

  products.forEach((product) => {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${product.id}</td>
        <td>${
          product.name
        } <div class="tooltip"><img src="./tooltip-icon.svg" alt="icon" /> <span class="tooltiptext"><div class="tootip-title">Product Description</div><br/>Portable speaker with powerful sound and long battery life.</span> </div></td>
        <td>${product.date}</td>
        <td><span class="status ${
          product.status === "✔️" ? "success" : "fail"
        }">${product.status}</span></td>
        <td>${product.color}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.amount}</td>
        <td>
          <button class="action-btn edit">
            <img src="./edit-icon.svg" alt="edit" />
          </button>
          <button class="action-btn delete" id="action-delete" data-id="${
            product.id
          }">
            <img src="./delete-icon.svg" alt="delete" />
          </button>
        </td>
      `;

    productTableBody.appendChild(tableRow);
  });
  setupDeleteButtons();
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete, .delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.closest("button").dataset.id;
      showDeleteModal(productId);
    });
  });
}

let productIdToDelete;
function showDeleteModal(productId) {
  productIdToDelete = productId;
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "flex";
}

function deleteProduct() {
  products.splice(
    products.findIndex((p) => p.id === productIdToDelete),
    1
  );
  populateProductCards();
  populateProductTable();
  productIdToDelete = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteModal = document.getElementById("deleteModal");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const confirmDeleteBtn = document.querySelector(".delete-btns");

  cancelBtn.addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  confirmDeleteBtn.addEventListener("click", () => {
    deleteModal.style.display = "none";
    deleteProduct();
  });
});

populateProductCards();
populateProductTable();

const addRecordButton = document.querySelector(".add-button");
const formContainer = document.getElementById("form-container");
const cancelButton = document.querySelector(".cancel-btn");

addRecordButton.addEventListener("click", () => {
  formContainer.classList.add("visible");
});

cancelButton.addEventListener("click", () => {
  formContainer.classList.toggle("visible");
});

const updateAmount = () => {
  const price = parseFloat(document.getElementById("price").value) || 0;
  const quantity = parseInt(document.getElementById("quantity").value) || 0;
  const amount = price * quantity;
  document.getElementById("amount").value = amount;
};

document.getElementById("quantity").addEventListener("input", updateAmount);
document.getElementById("price").addEventListener("input", updateAmount);

document
  .querySelector(".add-record-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const date = document.getElementById("date").value;

    const statusValue = document.querySelector(
      'input[name="status"]:checked'
    ).value;
    const status = statusValue === "available" ? "✔️" : "✖";

    const colorElements = document.querySelectorAll(
      'input[name="color"]:checked'
    );
    const colors = Array.from(colorElements)
      .map((el) => el.value)
      .join(", ");
    const price = parseFloat(document.getElementById("price").value) || 0;
    const quantity = parseInt(document.getElementById("quantity").value) || 0;
    const amount = parseFloat(document.getElementById("amount").value) || 0;

    const newProduct = {
      id: id,
      name: name,
      description: description,
      date: date,
      status: status,
      color: colors,
      price: price,
      quantity: quantity,
      amount: amount,
    };

    products.push(newProduct);

    populateProductCards();
    populateProductTable();

    document.querySelector(".add-record-form").reset();
    document.getElementById("amount").value = "";
    document
      .querySelectorAll('input[name="color"]')
      .forEach((el) => (el.checked = false));

    formContainer.classList.toggle("visible");
    console.log(newProduct);
  });

window.addEventListener("click", (event) => {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
});
