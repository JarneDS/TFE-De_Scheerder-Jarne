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

let mapDataA = 'MoteurIntro';
let mapDataB = 'FreinsIntro';
let mapDataC = 'PeintureIntro';
let mapDataD = 'ChassisIntro';
let mapDataE = 'RouesIntro';
let mapDataF = 'SuspensionIntro';
let mapDataG = 'TemoinsIntro';


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.select-part').forEach(btn => {
        btn.addEventListener('click', () => {
            setMapData(btn);
        });
    });

    function setMapData(btn) {
        mapDataA = btn.dataset.value;
        mapDataB = btn.dataset.value;
        mapDataC = btn.dataset.value;
        mapDataD = btn.dataset.value;
        mapDataE = btn.dataset.value;
        mapDataF = btn.dataset.value;
        mapDataG = btn.dataset.value;
        updateView();
    }

    function updateView() {
        const sections = document.querySelectorAll('.part');

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const activeA = document.getElementById(mapDataA);
        if (activeA) {
            activeA.classList.add("active");
        }

        const activeB = document.getElementById(mapDataB);
        if (activeB) {
            activeB.classList.add("active");
        }

        const activeC = document.getElementById(mapDataC);
        if (activeC) {
            activeC.classList.add("active");
        }

        const activeD = document.getElementById(mapDataD);
        if (activeD) {
            activeD.classList.add("active");
        }

        const activeE = document.getElementById(mapDataE);
        if (activeE) {
            activeE.classList.add("active");
        }

        const activeF = document.getElementById(mapDataF);
        if (activeF) {
            activeF.classList.add("active");
        }

        const activeG = document.getElementById(mapDataG);
        if (activeG) {
            activeG.classList.add("active");
        }

        document.querySelectorAll('.select-part').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.value === mapDataA) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataB) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataC) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataD) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataE) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataF) {
                btn.classList.add('selected');
            }
            if (btn.dataset.value === mapDataG) {
                btn.classList.add('selected');
            }
        });
    }

    updateView();
});
