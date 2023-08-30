const categorieSelect = document.getElementById("categorieSelect");
const uniteSelect = document.getElementById("uniteSelect");


async function populateSelectWithData() {
    try {
        const response = await fetch("http://localhost:8000/api/categorie"); 
        const datas = await response.json();

        const optionElements = datas.map(data => {
            const option = document.createElement("option");
            option.value = data.id;
            option.textContent = data.libelle;
            return option;
        });

        categorieSelect.append(...optionElements);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

populateSelectWithData();

// Assuming you have an HTML element with the id "categoryTableBody" for the table body

async function populateTableWithData() {
    try {
        const response = await fetch("http://localhost:8000/api/article");
        const data = await response.json();

        const tableBody = document.getElementById("categoryTableBody");

        const rows = data.map(vente => {
            return `
                <tr>
                    <td class="text-center align-middle">${vente.id}</td>
                    <td class="text-center align-middle">${vente.libelle}</td>
                    <td class="text-center align-middle">${vente.prixAchat}</td>
                    <td class="text-center align-middle">${vente.qteStock}</td>
                    <td class="text-center align-middle">
                        <img src="data:image/jpeg;base64,${vente.photo}" alt="Image" width="70" height="50">
                    </td>
                    <td class="text-center align-middle">
                        <a class="btn btn-light" href="#" role="button">Edit</a>
                        <a class="btn btn-danger" href="#" role="button">Delete</a>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = rows.join("");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function to populate the table
populateTableWithData();


populateTableWithData();


document.addEventListener("DOMContentLoaded", function () {
    const libelleInput = document.getElementById("libelle");
    const categorieSelect = document.getElementById("categorieSelect");
    const referenceInput = document.querySelector(".refer input");
  
    // Event listener for changes in Libelle and Categorie
    libelleInput.addEventListener("input", updateReference);
    categorieSelect.addEventListener("change", updateReference);
  
    // Function to update the Reference input
    function updateReference() {
      const libelleValue = libelleInput.value.trim().toUpperCase();
      const selectedCategorieOption = categorieSelect.options[categorieSelect.selectedIndex];
      
      // Check if the selected option is not the default one
      if (selectedCategorieOption.value !== "" && libelleValue !== "") {
        const categorieText = selectedCategorieOption.textContent.trim().toUpperCase();
        
        // Get the first three characters from Libelle and Categorie text
        const libellePrefix = libelleValue.slice(0, 3);
        const categoriePrefix = categorieText.slice(0, 3);
        
        // Combine the prefixes with hyphens
        const referenceValue = [libellePrefix, categoriePrefix,"001"].join("-");
        
        // Update the value of the Reference input
        referenceInput.value = referenceValue;
      }
    }
    
    // Initial update of the reference on page load
    updateReference();
  });
  