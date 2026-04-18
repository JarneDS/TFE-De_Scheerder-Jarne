const marqueInput = document.getElementById("MVoiture");
const typeSelect = document.getElementById("typeVoiture");
const btnAjouter = document.getElementById("ajouterVoiture");
const liste = document.getElementById("listeVoitures");

let voitures = JSON.parse(localStorage.getItem("voitures")) || [];

if (marqueInput && typeSelect && btnAjouter && liste) {
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
};

let mapData = 'MoteurIntro';

document.addEventListener("DOMContentLoaded", () => {

    // Quand on clique sur un bouton
    document.querySelectorAll('.select-part').forEach(btn => {
        btn.addEventListener('click', () => {
            setMapData(btn);
        });
    });

    // Fonction appelée au clic
    function setMapData(btn) {
        mapData = btn.dataset.value; // ex: "Liquides"
        updateView();
    }

    // Met à jour l'affichage
    function updateView() {
        const sections = document.querySelectorAll('.part');

        // Cache toutes les sections
        sections.forEach(section => {
            section.classList.remove("active");
        });

        // Affiche la bonne section
        const active = document.getElementById(mapData);
        if (active) {
            active.classList.add("active");
        }

        // Met à jour l'état des boutons
        document.querySelectorAll('.select-part').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.value === mapData) {
                btn.classList.add('selected');
            }
        });
    }

    // État initial : rien affiché
    updateView();
});
