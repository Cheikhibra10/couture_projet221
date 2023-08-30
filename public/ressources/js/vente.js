


const inputeElement = document.getElementById("libelle");
const submitArticle = document.getElementById("submit");
const feedbackElement = document.getElementById("feedbackMessage");

async function checkVenteExistence(libelleVente) {
    const response = await fetch("http://localhost:8000/api/article");
    const ventes = await response.json();

    const venteExists = ventes.some(vente => vente.libelle === libelleVente);

    return venteExists;
}

inputeElement.addEventListener("input", async event => {
    const enteredLibelle = event.target.value.trim();

    if (enteredLibelle.length >= 3) {
        const venteExists = await checkVenteExistence(enteredLibelle);

        if (venteExists) {
            feedbackElement.textContent = `Ce libille existe deja.`;
            feedbackElement.className = "success-messagee"; // Apply appropriate CSS class for success
            submitArticle.disabled = true; // Disable the submit button
        } else {
            feedbackElement.textContent = `Ce libelle n'existe pas.`;
            feedbackElement.className = "error-messagee"; // Apply appropriate CSS class for error
            submitArticle.disabled = false; // Enable the submit button
        }
    } else {
        feedbackElement.textContent = "Veuillez saisir un libelle.";
        feedbackElement.className = ""; // Clear the CSS class
        submitArticle.disabled = false; // Disable the submit button
    }
});
