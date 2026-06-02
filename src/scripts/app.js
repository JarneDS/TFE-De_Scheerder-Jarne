"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* GSAP */

document.addEventListener("DOMContentLoaded", () => {
    const voiture = document.querySelector(".voitureRendu");

    if (voiture) {
        gsap.fromTo(voiture,
            {
                xPercent: 200,
                scale: 0.3,
                opacity: 0
            },
            {
                xPercent: 0,
                scale: 1,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out"
            }
        );
    }
});

function initGSAPAnimations() {
    document.querySelectorAll(".col__img--left, .col--left").forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            xPercent: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform"
        });
    });

    document.querySelectorAll(".col__img--right, .col--right").forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            xPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform"
        });
    });
}


/* MENU */

var menuBtn = document.querySelector(".menu__btn");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    var menu = document.querySelector(".menu");
    menu.classList.toggle("menu--open");
};

/* MES VOITURES */
const page = location.pathname.split("/").pop();

if (page === "mesVoitures.html") {
    const marqueInput = document.getElementById("MVoiture");
    const typeSelect = document.getElementById("typeVoiture");
    const btnAjouter = document.getElementById("ajouterVoiture");
    const liste = document.getElementById("listeVoitures");

    let voitureSelectionner = false;

    let voitures = JSON.parse(localStorage.getItem("voitures")) || [];

    // sécurisé l'entrer utilisateur
    function sanitize(str) {
        return str.replace(/[<>"']/g, "").trim();
    };

    // vérifier les entrer pour éviter le code pur en entrer
    const regexVoiture = /^[A-Za-zÀ-ÿ0-9\s\-]{2,30}$/;

    if (marqueInput && typeSelect && btnAjouter && liste) {
        function afficherVoitures() {
            if (voitures.length === 0) {
                liste.innerHTML = "<p>Aucune voiture enregistrée.</p>";
                return;
            };

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
            };

            voitureSelect.forEach((voiture, index) => {
                voiture.addEventListener("click", () => {

                    if (voiture.classList.contains("actif")) {
                        voiture.classList.remove("actif");
                        localStorage.removeItem("voitureActive");
                        voitureSelectionner = false;
                        return;
                    };

                    voitureSelect.forEach(el => el.classList.remove("actif"));
                    voiture.classList.add("actif");
                    voitureSelectionner = true;
                    window.location.href = "page-parties.html";

                    localStorage.setItem("voitureActive", index);
                });
            });
        };

        btnAjouter.addEventListener("click", () => {
            let marque = sanitize(marqueInput.value);
            let type = sanitize(typeSelect.value);

            if (!marque || !type) {
                alert("Veuillez remplir les deux champs.");
                return;
            };

            if (!regexVoiture.test(marque)) {
                alert("Marque invalide (2–30 caractères, lettres/chiffres/espaces/tirets).");
                return;
            };

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
};

// Prendre les datas des premières divs de chaque page
let mapDataA = 'MoteurIntro';
let mapDataB = 'FreinsIntro';
let mapDataC = 'PeintureIntro';
let mapDataD = 'ChassisIntro';
let mapDataE = 'RouesIntro';
let mapDataF = 'SuspensionIntro';
let mapDataG = 'TemoinsIntro';


document.addEventListener("DOMContentLoaded", () => {

    const page3 = location.pathname.split("/").pop();

    document.querySelectorAll('.select-part').forEach(btn => {
        btn.addEventListener('click', () => {

            if (page3 === "moteur.html") {
                // sur moteur.html, on passe par afficherParties
                afficherParties(btn.dataset.value);
                return;
            }

            // sur les autres pages, on garde l’ancien système
            setMapData(btn);
        });
    });

    if (page3 !== "moteur.html") {
        updateView();
    }

    function setMapData(btn) {
        mapDataA = btn.dataset.value;
        mapDataB = btn.dataset.value;
        mapDataC = btn.dataset.value;
        mapDataD = btn.dataset.value;
        mapDataE = btn.dataset.value;
        mapDataF = btn.dataset.value;
        mapDataG = btn.dataset.value;
        updateView();
    };

    // faire en sorte que quand on va sur la page, par exemple moteur, que la div MoteurIntro soit affiché
    function updateView() {
        const sections = document.querySelectorAll('.part');

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const activeA = document.getElementById(mapDataA);
        const partiesMoteur = document.querySelector('.selectionParties');
        if (activeA) {
            activeA.classList.add("active");
        };

        const activeB = document.getElementById(mapDataB);
        if (activeB) {
            activeB.classList.add("active");
        };

        const activeC = document.getElementById(mapDataC);
        if (activeC) {
            activeC.classList.add("active");
        };

        const activeD = document.getElementById(mapDataD);
        if (activeD) {
            activeD.classList.add("active");
        };

        const activeE = document.getElementById(mapDataE);
        if (activeE) {
            activeE.classList.add("active");
        };

        const activeF = document.getElementById(mapDataF);
        if (activeF) {
            activeF.classList.add("active");
        };

        const activeG = document.getElementById(mapDataG);
        if (activeG) {
            activeG.classList.add("active");
        };

        document.querySelectorAll('.select-part').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.value === mapDataA) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataB) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataC) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataD) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataE) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataF) {
                btn.classList.add('selected');
            };
            if (btn.dataset.value === mapDataG) {
                btn.classList.add('selected');
            };
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        initGSAPAnimations();
    };
});

document.querySelectorAll(
    ".boutonMoteurA, .boutonMoteurB, .boutonMoteurC, .boutonMoteurD, .boutonMoteurE, .boutonMoteurF"
).forEach(btn => {
    btn.addEventListener("click", () => {
        afficherParties(btn.dataset.value);
    });
});

function afficherParties(value) {
    const sections = document.querySelectorAll(".part");
    const selection = document.querySelector(".selectionParties");
    const btnsModel = document.querySelector(".btnsModel");

    // cacher les sections
    sections.forEach(s => s.classList.remove("active"));

    // afficher la bonne
    const target = document.getElementById(value);
    if (target) {
        target.classList.add("active");
    }

    // mettre à jour l'état selected des boutons selectionParties
    document.querySelectorAll('.select-part').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });

    // cacher les blocs de choix
    if (value === "MoteurIntro") {
        selection.style.display = "none";
        btnsModel.style.display = "block";
    } else {
        selection.style.display = "block";
        btnsModel.style.display = "none";
    }

    // Relancer GSAP sur la nouvelle section
    initGSAPAnimations();
    ScrollTrigger.refresh();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (page === "entretien.html" || page === "diagnostiques.html") {

    const sectionEntretien = document.querySelector('.Entretien');
    const sectionPart = document.querySelector('.Entretienpart__container');
    const btnRetourEntretien = document.querySelector('.btnEntretien');

    // fonction afficherPart
    function afficherPart(value) {

        sectionEntretien.style.display = "none";
        sectionPart.style.display = "block";

        document.querySelectorAll('.Entretienpart').forEach(p => {
            p.classList.remove('active');
        });

        const target = document.getElementById(value);
        if (target) {
            target.classList.add('active');

            window.scrollTo({ top: 0, behavior: "smooth" });

            initGSAPAnimations();
        }
    }

    // 1. Clic sur une carte
    document.querySelectorAll('.Entretien__cart').forEach(cart => {
        cart.addEventListener('click', () => {
            afficherPart(cart.dataset.value);
        });
    });

    document.querySelectorAll('.Diagno__cart').forEach(cart => {
        cart.addEventListener('click', () => {
            afficherPart(cart.dataset.value);
        });
    });

    // 2. Clic sur le bouton Retour (btnEntretien)
    if (btnRetourEntretien) {
        btnRetourEntretien.addEventListener('click', () => {
            sectionPart.style.display = "none";
            sectionEntretien.style.display = "block";

            document.querySelectorAll('.Entretienpart').forEach(p => {
                p.classList.remove('active');
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
};

if (page === "moteur.html") {
    afficherParties("MoteurIntro");
}

