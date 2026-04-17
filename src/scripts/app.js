const marqueInput = document.getElementById("MVoiture");
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
                <button class="voiture-check">
                    <p>${voiture.marque} – ${voiture.type}</p>
                    <span class="check">&#x2714;</span>
                </button>
                <button onclick="supprimerVoiture(${index})" class="suppVehicule">Supprimer ce véhicule</button>
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

const voitureSelect = document.querySelectorAll(".voiture-check");
const activeIndex = localStorage.getItem("voitureActive");

if (activeIndex !== null && voitureSelect[activeIndex]) {
    voitureSelect[activeIndex].classList.add("actif");
}

voitureSelect.forEach((v, index) => {
    v.addEventListener("click", () => {

        voitureSelect.forEach(el => el.classList.remove("actif"));

        v.classList.add("actif");

        localStorage.setItem("voitureActive", index);
    });
});

