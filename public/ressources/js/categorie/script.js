import { Api } from "./../core/api.js";
import { WEB_URL } from "./../core/bootstrap.js";
const fournisseur = document.getElementById("fournisseur");


  const addCategorie = document.getElementById('categorie');
  const categorieSelect = document.getElementById('categorieSelect');
  const libelle1 = document.getElementById('libelle1');
  const unitedefaut = document.getElementById('unitedefaut');
  const unitedefaut2 = document.getElementById('unitedefaut2');
  const conversion = document.getElementById('conversion');
  const unite1 = document.getElementById('unitedefaut2');
  const convertion1 = document.getElementById('conversion');
  const okButton = document.getElementById('okButton'); 
  
  
  
  document.getElementById('submitBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const value = libelle1.value;
    const value1 = unitedefaut.value.trim();
    const value2 = conversion.value.trim();
  
    try {
      // Your API call and form reset logic here
      await Api.postData(`${WEB_URL}/categorieadd`, { libelle1: value, unitedefaut: value1, conversion: value2 });
  
      const newOption = document.createElement('option');
      newOption.value = value;
      newOption.textContent = value;
      categorieSelect.appendChild(newOption);
  
      categorieSelect.value = value;
      uniteSelect.removeAttribute('disabled');
      addCategorie.reset();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
   


addFournisseur.onsubmit = async (e) => {
  e.preventDefault();
  const value1 = prenom.value;
  const value2 = nom.value;
// console.log(value);
  try {
    await Api.postData(`${WEB_URL}/fournisseur_add`, { prenom: value1,nom: value2 });
    
    // Reset the form
    addFournisseur.reset();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

addForm.onsubmit = async (e) => {
  const libelle1 = categorieSelect.options[categorieSelect.selectedIndex].value;
  const reference = document.getElementById('reference').value;
  const libelle2 = document.getElementById('libelle');
  e.preventDefault();
  const value1 = libelle2.value;
  const value2 = quantite.value;
  const value3 = prix.value;
  const value4 = reference;
  const value5 = libelle1;

  // Find the selected checkbox value
  const selectedCheckbox = document.querySelector('input[name="selectedSuppliers"]:checked');
  const value6 = selectedCheckbox ? selectedCheckbox.getAttribute("data-supplier-id") : "";

  // Handle image data
  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = async function () {
      const base64Image = reader.result.split(',')[1];

      try {
        await fetch(`${WEB_URL}/store-article`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            libelle2: value1,
            quantite: value2,
            prix: value3,
            reference: value4,
            categorieSelect: value5,
            fournisseur: value6,
            image: base64Image // Include the base64 image data
          })
        });

        // Reset the form
        addForm.reset();
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    reader.readAsDataURL(imageFile);
  }
};

categorieSelect.addEventListener("change",async function(){
  const id = categorieSelect.options[categorieSelect.selectedIndex].value
  await Api.postData(`${WEB_URL}/categorie-getUnite`,{idCategorie: id}).then(function (data) {
          // console.log(data);           
   }) 
  })

 
  
  categorieSelect.addEventListener('change', async function () {
    const uniteBtn = document.getElementById('uniteBtn');
      async function populateSelectWithData1() {
          try {
              const response = await fetch("http://localhost:8000/api/UniteByCategorie");
              const datas = await response.json();
              // Fetch unite_par_defaut data
              const uniteParDefautResponse = await fetch("http://localhost:8000/api/categorie");
              const uniteParDefautData = await uniteParDefautResponse.json();
  
              // Clear existing options
              uniteSelect.innerHTML = '';
  
              datas.forEach(data => {
                const uniteParDefautValue = uniteParDefautData.find(item => item.id === data.id);
              
                const option = document.createElement("option");
            
                if (uniteParDefautValue && uniteParDefautValue.unite_par_defaut) {
                    option.value = `${data.id}_libelle`;
                    option.textContent = `${data.libelle}`;
                } else {
                  option.value = `${data.id}_libelle`;
                  option.textContent = `${data.libelle}`;
                }
                uniteBtn.style.display = 'block';
                uniteSelect.appendChild(option);
            });
            
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }
  
      populateSelectWithData1();
  });
  

  okButton.addEventListener("click", (event) => {
    addToCart();
    unitedefaut2.value = "";
    event.preventDefault();
  });
  
  function addToCart() {
    const unite = unite1.value;
    const convertion = convertion1.value;
    // console.log(convertion);
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td style="margin-left: -10px;">${unite}</td>
          <td style="margin-left: -10px;">${convertion}</td>
          <td><button class="deleteButton">Supprimer</button></td>
        `;
  
        const deleteButton = newRow.querySelector(".deleteButton");
        deleteButton.style.backgroundColor='black';
        deleteButton.style.color='white';
        deleteButton.style.borderRadius='5px';
        deleteButton.style.marginTop='5px';
        deleteButton.style.padding='2px 3px';
        deleteButton.addEventListener("click", () => {
          cartTable.removeChild(newRow);
          updateCartData();
        });
  
        cartTable.appendChild(newRow);
        updateCartData();   
  
  }
  
  function getCartItemsFromTable() {
  // Define an array to store the extracted values
  const extractedValues = [];
  // console.log(extractedValues);
  // Loop through the table rows and extract values
  const cartRows = cartTable.querySelectorAll("tr");
  cartRows.forEach(row => {
    const uniteValue = row.cells[0].textContent.trim(); // Example: Value from the first column
    const convertionValue =  parseInt(row.cells[1].textContent.trim()); // Example: Value from the second column
  
    extractedValues.push({ unite: uniteValue, convertion: convertionValue });
  });
  if (extractedValues.length > 0) {
    extractedValues.shift();
  }
  return extractedValues;
  console.log(extractedValues); // Use this array as needed
  }
  
  function updateCartData() {
    const cartItems = getCartItemsFromTable(); // Retrieve cart items from the table
    return cartItems; // Save the updated cart data to storage
  }
  
  document.getElementById('submitBtne').addEventListener('click', async (e) => {
    const libelle = categorieSelect.options[categorieSelect.selectedIndex].value;
    document.getElementById('libelle2').value = libelle;
    e.preventDefault();
    const extractedValues = getCartItemsFromTable()
    let value, value2, value3; // Declare the variables
    
    if (extractedValues.length > 0) {
      // Access the values from the first element of the array
      const firstExtractedValue = extractedValues[0];
    
      // Assign the values to the variables
      value = libelle; // Assuming conversion is from somewhere else
      // console.log(value);
      value2 = firstExtractedValue.unite;   
      value3 = firstExtractedValue.convertion;
    }
    try {
      const postDataResponse = await Api.postData(`${WEB_URL}/unite_add`, {
        extractedValues: extractedValues,
        libelle: value,
        unitedefaut2: value2,
        conversion: value3
      });
  
      if (postDataResponse.ok) {
        // Request was successful
        const responseData = await postDataResponse.json(); // Parse the response data if it's JSON
        console.log(responseData); // Handle the response data from the server
      } else {
        console.error('Request failed:', postDataResponse.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
   

document.getElementById('uniteBtn').addEventListener('click', async (e) => {
  const id = categorieSelect.value;
  const libelle = categorieSelect.options[categorieSelect.selectedIndex].textContent;
  // console.log(libelle); 
  const libelleUnite = uniteSelect.options[uniteSelect.selectedIndex].textContent;
  // console.log(libelleUnite);
document.getElementById('libelle2').value = libelle;
document.getElementById('unitedefaute').value = libelleUnite;
    e.preventDefault();
});

document.getElementById('fournisseurBtn').addEventListener('click', async (e) => {
  const id = categorieSelect.value;
  const libelle = categorieSelect.options[categorieSelect.selectedIndex].textContent;
  // console.log(libelle); 
  // console.log(libelleUnite);
document.getElementById('libelle3').value = libelle;

});






addForm.addEventListener('submit', function (e) {
  e.preventDefault();
  //Champs requis
  checkRequired([libelle, prix, categorie]);
 })
 
 
 //Functions

 
 function showSuccess(input) {
  const parent = input.parentElement;
  parent.className = 'col-md-6 position-relative formC  success'
 }
 function showError(input, errorMessage) {
  const parent = input.parentElement;
  parent.className = 'col-md-6 position-relative formC  error';
  const small = parent.querySelector('small');
  small.innerText = errorMessage;
 }
 function checkRequired(inputArray) {
  inputArray.forEach(input => {
   if (input.value.trim() === '') {
    const name = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    showError(input, `${name} est obligatoire!!!`); // Add 'error' class
   } else {
    showSuccess(input);// Add 'success' class
   }
  })
 }