const inputElement = document.getElementById("fournisseur");
const checkboxContainer = document.getElementById("checkboxContainere");

// Arrays to store selected checkbox values and checkboxes for display
const selectedCheckboxes = new Set();
const displayedCheckboxes = [];

// Function to fetch suppliers containing given letters
async function fetchSuppliersContaining(letters) {
  const response = await fetch("http://localhost:8000/api/fournisseur");
  const fournisseurs = await response.json();

  const matchingSuppliers = fournisseurs.filter(
    fournisseur => fournisseur.prenom.toLowerCase().includes(letters.toLowerCase())
  );

  return matchingSuppliers;
}

// Function to create a new supplier checkbox
function createSupplierCheckbox(supplierId, supplierPrenom, isChecked) {
  if (selectedCheckboxes.has(supplierId)) {
    return;
  }

  const container = document.createElement("div");
  container.classList.add("checkbox-label-container"); // Add the CSS class

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "selectedSuppliers";
  checkbox.value = supplierId;
  checkbox.checked = isChecked;
  checkbox.setAttribute("data-supplier-id", supplierId);

  const label = document.createElement("label");
  label.textContent = supplierPrenom;

  container.appendChild(checkbox);
  container.appendChild(label);

  checkbox.addEventListener("change", updateSelectedCheckboxes);

  selectedCheckboxes.add(supplierId);
  displayedCheckboxes.push(container);

  checkboxContainer.appendChild(container);
}

// Function to update the selected checkboxes
function updateSelectedCheckboxes() {
  selectedCheckboxes.clear();

  displayedCheckboxes.forEach((container, index) => {
    const checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      selectedCheckboxes.add(checkbox.value);
    } else {
      checkboxContainer.removeChild(container); // Remove the container from the DOM
      displayedCheckboxes.splice(index, 1);     // Remove the container from the displayedCheckboxes array
    }
  });

  localStorage.setItem("selectedSuppliers", JSON.stringify([...selectedCheckboxes]));
}


inputElement.addEventListener("input", async (event) => {
  const lettersTyped = event.target.value.trim();

  // Clear the displayed checkboxes
  checkboxContainer.innerHTML = "";

  displayedCheckboxes.forEach(checkbox => {
    checkboxContainer.appendChild(checkbox); // Display the checkboxes again
  });

  if (lettersTyped.length >= 3) {
    const matchingSuppliers = await fetchSuppliersContaining(lettersTyped);

    if (matchingSuppliers.length > 0) {
      matchingSuppliers.forEach(supplier => {
        const isSelected = selectedCheckboxes.has(supplier.id);
        createSupplierCheckbox(supplier.id, supplier.prenom, isSelected);
      });
    } else {
      // Update the message without clearing the checkboxes
      const selectedSuppliers = JSON.parse(localStorage.getItem("selectedSuppliers")) || [];
      selectedSuppliers.forEach(selectedSupplier => {
        const supplier = displayedCheckboxes.find(checkbox => checkbox.value === selectedSupplier);
        if (supplier) {
          createSupplierCheckbox(supplier.value, supplier.nextSibling.textContent, true);
        }
      });
    }
    event.target.value = "";
  }

  // Clear the input after processing
});

// Load selected suppliers from local storage
document.addEventListener("DOMContentLoaded", () => {
  const selectedSuppliers = JSON.parse(localStorage.getItem("selectedSuppliers")) || [];
  selectedSuppliers.forEach(selectedSupplier => {
    const supplier = displayedCheckboxes.find(checkbox => checkbox.value === selectedSupplier);
    if (supplier) {
      createSupplierCheckbox(supplier.value, supplier.nextSibling.textContent, true);
    }
  });
});
