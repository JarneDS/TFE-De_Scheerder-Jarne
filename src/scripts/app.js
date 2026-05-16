"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* GSAP */

document.addEventListener("DOMContentLoaded", () => {
    const voiture = document.querySelector(".voitureRendu");

    if (voiture) {
        gsap.from(voiture, {
            x: window.innerWidth,
            scale: 0.3,
            opacity: 0,
            duration: 1.8,
            ease: "power3.out"
        });
    }
});

function initGSAPAnimations() {
    document.querySelectorAll(".col__img--left, .col--left").forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            x: -window.innerWidth,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    document.querySelectorAll(".col__img--right, .col--right").forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            x: window.innerWidth,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
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

/* INDEX */

const page = location.pathname.split("/").pop();

if (page === "index.html" || page === "") {
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

    const btnCommencer = document.querySelector(".commencer");

    btnCommencer.addEventListener('click', () => {
        if (voitureSelectionner) {
            location.href = "page-parties.html";
        } else {
            location.href = "selection.html";
        };
    });
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
    };

    // faire en sorte que quand on va sur la page, par exemple moteur, que la div MoteurIntro soit affiché
    function updateView() {
        const sections = document.querySelectorAll('.part');

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const activeA = document.getElementById(mapDataA);
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

        document.querySelectorAll(".col__img--left, .col--left").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                x: -window.innerWidth,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        document.querySelectorAll(".col__img--right, .col--right").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                x: window.innerWidth,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });
    };

    updateView();
});

const page2 = location.pathname.split("/").pop();

if (page2 === "entretien.html" || page2 === "diagnostiques.html") {

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
