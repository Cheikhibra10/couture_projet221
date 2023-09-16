import { Api } from "./../core/api.js";
import { WEB_URL } from "./../core/bootstrap.js";

const tailleSelect = document.getElementById('tailleSelect');
const libellet = document.getElementById('libellet');
const categorieSelect1 = document.getElementById('categorieSelect1');
const marge = document.getElementById('marge');
document.getElementById('submitBtnTaille').addEventListener('click', async (e) => {
 e.preventDefault();
 const value = libellet.value;
// console.log(value);

 try {
   // Your API call and form reset logic here
   await Api.postData(`${WEB_URL}/taille_add`, { libellet: value });

   const newOption = document.createElement('option');
   newOption.value = value;
   newOption.textContent = value;
   tailleSelect.appendChild(newOption);

   tailleSelect.value = value;
 } catch (error) {
   console.error('An error occurred:', error);
 }
});

async function populateSelectWithData() {
 try {
     const response = await fetch("http://localhost:8000/api/taille"); 
     const datas = await response.json();
     const optionElements = datas.map(data => {
         const option = document.createElement("option");
         option.value = data.id;
         option.textContent = data.libelle;
         return option;
     });

     tailleSelect.append(...optionElements);
 } catch (error) {
     console.error("Error fetching data:", error);
 }
}

populateSelectWithData();

async function populateSelectWithData1() {
 try {
     const response = await fetch("http://localhost:8000/api/categorie1"); 
     const datas = await response.json();

     const optionElements = datas.map(data => {
         const option = document.createElement("option");
         option.value = data.id;
         option.textContent = data.libelle;
         return option;
     });

     categorieSelect1.append(...optionElements);
 } catch (error) {
     console.error("Error fetching data:", error);
 }
}

populateSelectWithData1();



let l = 1; 
let formValues = [];
let total = 0;
let totalMargin = 0;
let totalProduction = 0;
let isHandlerRunning = false;
let element = null;

document.addEventListener('DOMContentLoaded', function(){
  const categoryTableBody = document.getElementById('categoryTableBody');
  const cartItems = [];
  addNewRow();
  
  addArticle.addEventListener('click', function () {
    l += 1;
    addNewRow();
  });
  function addNewRow() {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="form-group has-success">
          <label class="form-label" for="inputvalid">libelle</label>
          <input type="text" name="referent" value="" class="form-control" id="libelle${l}">
          <div id="errorMessageMarge${l}" style="color:red"></div>
        </div>
      </td>
      <td>
        <div class="form-group has-success">
          <label class="form-label" for="inputvalid">quantite</label>
          <div style="display:flex">
          <input type="text" name="referent" value="" class="form-control" id="quantite${l}">
          <span id="spann${l}" value = "">(convert)</span>
          </div>
          <div id="errorMessage${l}" style="color:red"></div>
          <div id="errorMessage1${l}" style="color:red"></div>
        </div>
      </td>
    `;

    categoryTableBody.appendChild(row);
    //validation des champs
    const libelleInput = document.getElementById(`libelle${l}`);
    const quantiteInput = document.getElementById(`quantite${l}`);
   const spannInput = document.getElementById(`spann${l}`)
    const addArticle = document.getElementById('addArticle');
    const libelleValue = libelleInput.value.trim();
  const quantiteValue = parseInt(quantiteInput.value.trim());

  // Push the extracted values as an object into the cartItems array
  cartItems.push({ libelle: libelleValue, quantite: quantiteValue });
    const errorMessageLibelle = document.getElementById(`errorMessageMarge${l}`);
           if(libelleInput.value == ""){
            addArticle.disabled = true
             quantiteInput.disabled = true
            }
            let trouve = false;
            let dernierValeur = "" 
            libelleInput.addEventListener('input', async function (event) {
              dernierValeur = event.target.value;
              const response = await fetch("http://localhost:8000/api/article");
              const response1 = await fetch("http://localhost:8000/api/unitecategorie");
              const data = await response.json();
              const data1 = await response1.json();
        
              data.forEach(dataElement => {
                if (dataElement.libelle == dernierValeur) {
                  addArticle.disabled = false;
                  quantiteInput.disabled = false;
                  element = dataElement; // Assign dataElement to element
                  //validaton numerique
                  data1.forEach(elemente => {
                    if (elemente.idCategorie == element.idCategorie) {
                      spannInput.textContent = elemente.libelle;
                    }
                  });
                  trouve = true;
                }
                if (trouve) {
                  quantiteInput.disabled = false;
                } else {
                  quantiteInput.disabled = true;
                }
              });
            }); 
            addArticle.addEventListener('click', async function(event){
              event.preventDefault(); // Prevent form submission or page refresh
              
              // Check if the handler is already running, and if it is, return early
              if (isHandlerRunning) {
                return;
              }
              
              // Set the flag to indicate that the handler is running
              isHandlerRunning = true;
              
              // Check if element is defined
              if (element) {
                const libelleValue = libelleInput.value;
                const quantiteValue = +quantiteInput.value;
                
                // Check if the values already exist in formValues to prevent duplication
                const isDuplicate = formValues.some(item => item.libelle === libelleValue && item.quantite === quantiteValue);
                
                if (!isDuplicate) {
                  const margin = 10; // Replace this with the actual margin calculation
                  const prixVenteArticle = quantiteValue * (+element.prixAchat);
                  
                  // Add prixVenteArticle to totalMargin
                  totalMargin += prixVenteArticle;
                  
                  // console.log(totalMargin);
                  
                  // Update the total display
                  prixVente.value = totalMargin;
                  
                  // Push the new values into the formValues array if not a duplicate
                  formValues.push({ libelle: libelleValue, quantite: quantiteValue });
                  // console.log(formValues);
                } else {
                  // Handle duplicate values (e.g., display a message)
                  console.log('Duplicate values not added.');
                }
              }
              
              // Reset the flag to allow the handler to run again
              isHandlerRunning = false;
            });
            

        //fin validation
        
        
      }
      marge.addEventListener('input', function(){
  const prixVenteValue = parseFloat(prixVente.value);
  const margeValue = parseFloat(marge.value);

  if (!isNaN(prixVenteValue) && !isNaN(margeValue)) {
    const coutVenteArticle = prixVenteValue * (1 + margeValue/ 100 ); // Calculate the price with margin
    totalProduction += coutVenteArticle;
    cProduction.value = totalProduction;
    console.log(cProduction.value);
  }
});


  
});


 

addForm.onsubmit = async (e) => {
  const libelle1 = categorieSelect1.options[categorieSelect1.selectedIndex].value;
  const taille1 = tailleSelect.options[tailleSelect.selectedIndex].value;
  // console.log(libelle1);
  const reference = document.getElementById('reference').value;
  const prixVenteValue = document.getElementById('prixVente').value;
  const marge = document.getElementById('marge').value;
  const cProduction = document.getElementById('cProduction').value;
  const libelle2 = document.getElementById('libelle');
  e.preventDefault();

  let value2, value3; // Declare the variables
  const formValues1 = formValues;
  console.log(formValues1);
  if (formValues1.length > 0) {
    // Access the values from the first element of the array
    const firstExtractedValue = formValues1[0];
  
    // Assign the values to the variables
    value2 = firstExtractedValue.libelle; // Use "libelle" property
    value3 = 5; // Use "quantite" property
    console.log('value2:', value3); // Add debugging statement
  } else {
    console.log('formValues is empty'); // Add debugging statement
  }

  const value1 = libelle2.value;
  console.log(value1);
  // const value2 = quantite.value;
  const value6 = prixVenteValue;
  console.log(value6);
  const value4 = reference;
  console.log(value4);
  const value5 = libelle1;
  console.log(value5);

const value7 = marge;
const value8 = cProduction
const value9 = taille1
console.log(value9);
// console.log(value7);
  // Find the selected checkbox value


  // Handle image data
  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = async function () {
      const base64Image = reader.result.split(',')[1];

      try {
        await fetch(`${WEB_URL}/store-vente`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            libelle2: value1,
            quantite: value3,
            prixVente: value6,
            reference: value4,
            categorieSelect1: value5,
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
  try {
    await fetch(`${WEB_URL}/store-articletaille`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        marge: value7,
        cProduction: value8,
        taille1: value9,
      })
    });

    // Reset the form
    addForm.reset();
  } catch (error) {
    console.error('An error occurred in the second try block:', error);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const libelleInput = document.getElementById("libelle");
  const categorieSelect1 = document.getElementById("categorieSelect1");
  const referenceInput = document.getElementById("reference");

  // Event listener for changes in Libelle and Categorie
  libelleInput.addEventListener("input", updateReference);
  categorieSelect1.addEventListener("change", updateReference);

  // Function to update the Reference input
  function updateReference() {
    const libelleValue = libelleInput.value.trim().toUpperCase();
    const selectedCategorieOption = categorieSelect1.options[categorieSelect1.selectedIndex];
    
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

const photo = document.querySelector('#image');
photo.addEventListener('change', onChangeImage);

let image = "";
let cheminImage = "";
function onChangeImage() {
 cheminImage = photo.files[0]['name'];
 let f = new FileReader();
 f.readAsDataURL(photo.files[0]);
 f.onloadend = function (event) {
  const path = event.target.result;
  document.querySelector('#photo').setAttribute('src', path);
 }
}