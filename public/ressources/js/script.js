
const photo = document.querySelector('#image');
const libelle = document.getElementById('libelle');
const prix = document.getElementById('prix');
const categorie = document.getElementById('categorieSelect');
const fournisseur = document.getElementById('fournisseur');
const quantite = document.getElementById('quantite');
const unite = document.getElementById('unite');
// Event
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


// var selectedOption = null;

// function updateCheckbox() {
//   var selectElement = document.getElementById("categorieSelect");
//   var checkboxContainer = document.getElementById("checkboxContainer");
//   var selectedValue = selectElement.value;

//   // Remove previous checkbox
//   checkboxContainer.innerHTML = "";

//   if (selectedValue !== "") {
//     selectedOption = selectedValue;
//     var checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.checked = true; // Checked by default

//     // Update selectedOption and re-render on checkbox click
//     checkbox.addEventListener("change", function (event) {
//       if (!checkbox.checked) {
//         selectedOption = null;
//         updateCheckbox();
//       }
//     });

//     var checkboxLabel = document.createElement("label");
//     checkboxLabel.textContent = selectElement.options[selectElement.selectedIndex].text;

//     checkboxContainer.appendChild(checkbox);
//     checkboxContainer.appendChild(checkboxLabel);
//   }
// }

// // Attach the updateCheckbox function to the select element's change event
// document.getElementById("categorieSelect").addEventListener("change", updateCheckbox);

// // Initial call to set up the initial checkbox
// updateCheckbox();


// Get references to the dropdowns
// const categorieSelect = document.getElementById('categorieSelect');
// const uniteSelect = document.getElementById('uniteSelect');

// Add event listener to categorie dropdown


// Function to populate the unite dropdown based on the selected category
