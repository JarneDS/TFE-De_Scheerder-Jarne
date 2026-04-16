const marqueInput = document.getElementById("marqueVoiture");
const typeSelect = document.getElementById("typeVoiture");
const btnAjouter = document.getElementById("ajouterVoiture");
const liste = document.getElementById("listeVoitures");

let voitures = JSON.parse(localStorage.getItem("voitures")) || [];

function afficherVoitures() {
    if (voitures.length === 0) {
        liste.innerHTML = "<p>Aucune voiture enregistrée.</p>";
        return;
    }

    liste.innerHTML = voitures
        .map((voiture, index) => `
            <div class="voiture-item">
                <p>${voiture.marque} – ${voiture.type}</p>
                <button onclick="supprimerVoiture(${index})">Supprimer</button>
            </div>
        `)
        .join("");
}

btnAjouter.addEventListener("click", () => {
    let marque = marqueInput.value.trim();
    let type = typeSelect.value;

    if (!marque || !type) {
        alert("Veuillez remplir les deux champs.");
        return;
    }

    marque = marque.toUpperCase();
    type = type.toUpperCase();

    voitures.push({ marque, type });
    localStorage.setItem("voitures", JSON.stringify(voitures));

    marqueInput.value = "";
    typeSelect.value = "";

    afficherVoitures();
});

window.supprimerVoiture = function(index) {
    voitures.splice(index, 1);
    localStorage.setItem("voitures", JSON.stringify(voitures));
    afficherVoitures();
};

afficherVoitures();
