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
    const btnAjouterProbleme = document.getElementById("ajouterProbleme");
    const listeProblemesConnus = document.getElementById("listeProblemesConnus");

    let voitureSelectionner = false;

    let voitures = JSON.parse(localStorage.getItem("voitures")) || [];
    let problemes = JSON.parse(localStorage.getItem("problemes")) || {};

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

                // vider les textes affichés
                document.querySelectorAll(".voitureSelectionner")
                    .forEach(el => el.textContent = "voiture");

                return;
            }

            liste.innerHTML = voitures
                .map((voiture, index) => `
                    <div class="voiture-item">
                        <button class="voiture-check" data-index="${index}">
                            <p>${voiture.marque} – ${voiture.type}</p>
                            <span class="check">&#x2714;</span>
                        </button>
                        <button onclick="supprimerVoiture(${index})" class="suppVehicule">Supprimer ce véhicule</button>
                    </div>
                `)
                .join("");

            const activeIndex = localStorage.getItem("voitureActive");

            // Sélection des deux listes
            const voitureSelectMain = document.querySelectorAll(".voiture-check:not(.side)");

            // LISTE PRINCIPALE
            voitureSelectMain.forEach((btn, index) => {
                btn.classList.toggle("actif", activeIndex == index);
                btn.addEventListener("click", () => setActiveVoiture(index));
            });
        }

        function afficherVoitureSelectionnee() {
            const index = localStorage.getItem("voitureActive");
            const cibles = document.querySelectorAll(".voitureSelectionner");

            if (index === null || !voitures[index]) {
                cibles.forEach(el => el.textContent = "voiture");
                return;
            }

            const voiture = voitures[index];
            const txt = `${voiture.marque} ${voiture.type}`;

            cibles.forEach(el => el.textContent = txt);
        }

        function afficherSelectVoiture() {
            const container = document.getElementById("selectVoiture");

            if (!container) return;

            if (voitures.length === 0) {
                container.innerHTML = "<p>Aucune voiture enregistrée.</p>";
                return;
            }

            container.innerHTML = `
                <select id="voitureSelect">
                    <option value="">Sélectionner une voiture</option>
                    ${voitures
                        .map((v, i) => `<option value="${i}">${v.marque} ${v.type}</option>`)
                        .join("")}
                </select>
            `;

            // Quand on change la sélection on active la voiture
            const select = document.getElementById("selectVoitureListe");
            select.addEventListener("change", () => {
                if (select.value !== "") {
                    setActiveVoiture(select.value);
                }
            });
        }

        function setActiveVoiture(index) {
            const activeIndex = localStorage.getItem("voitureActive");

            if (activeIndex == index) {
                localStorage.removeItem("voitureActive");
            } else {
                localStorage.setItem("voitureActive", index);
            }

            afficherVoitures();
            afficherVoitureSelectionnee();
            afficherProblemesConnus();
            afficherSelectVoiture();
        }

        function afficherProblemesConnus() {
            const index = localStorage.getItem("voitureActive");
            const liste = problemes[index] || [];
            const tbody = document.getElementById("listeProblemesConnus");

            /* Fusionner 3 colonnes en 1 avec colspan */
            if (liste.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="3">Aucun problème enregistré.</td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = liste
                .map((p, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${p.type}</td>
                        <td>${p.description}</td>
                        <td class="etatCell">
                            <select class="etatProbleme" data-index="${i}">
                                <option value="enCours">En cours</option>
                                <option value="repare">Réparé</option>
                            </select>
                        </td>
                        <td class="corbeille" data-index="${i}"><img src="corbeille.png" alt="Icone d'une poubelle" class="icone"></td>
                    </tr>
                `)
                .join("");

            document.querySelectorAll(".etatProbleme").forEach(select => {
                const index = localStorage.getItem("voitureActive");
                const i = select.dataset.index;
                const td = select.closest(".etatProbleme");

                // Charger l'état si déjà enregistré
                if (problemes[index][i].etat) {
                    select.value = problemes[index][i].etat;
                }

                // Fonction pour mettre la bonne couleur
                function updateColor() {
                    td.classList.remove("etat--encours", "etat--repare");

                    if (select.value === "enCours") {
                        td.classList.add("etat--encours");
                    } else if (select.value === "repare") {
                        td.classList.add("etat--repare");
                    }
                }

                // Appliquer la couleur au chargement
                updateColor();

                // Sauvegarder + mettre à jour la couleur quand on change
                select.addEventListener("change", () => {
                    problemes[index][i].etat = select.value;
                    localStorage.setItem("problemes", JSON.stringify(problemes));
                    updateColor();
                });
            });

            document.querySelectorAll(".corbeille").forEach(btn => {
                btn.addEventListener("click", () => {
                    const indexVoiture = localStorage.getItem("voitureActive");
                    const indexProbleme = btn.dataset.index;

                    // Supprimer le problème
                    problemes[indexVoiture].splice(indexProbleme, 1);

                    // Sauvegarder
                    localStorage.setItem("problemes", JSON.stringify(problemes));

                    // Rafraîchir l'affichage
                    afficherProblemesConnus();
                });
            });
        }

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

        btnAjouterProbleme.addEventListener("click", () => {
            const index = localStorage.getItem("voitureActive");
            const type = document.getElementById("typeProbleme").value;
            const description = document.getElementById("Description").value.trim();

            if (!index) {
                alert("Veuillez sélectionner une voiture.");
                return;
            }

            if (!type || !description) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            if (!problemes[index]) problemes[index] = [];

            problemes[index].push({ type, description });

            localStorage.setItem("problemes", JSON.stringify(problemes));

            afficherProblemesConnus();
        });

        afficherVoitures();
        afficherVoitureSelectionnee();
        afficherProblemesConnus();
        afficherSelectVoiture();
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

    /* code basé sur 2 sources :
    - https://codepen.io/Gutto/pen/GBLPyN
    - https://stackoverflow.com/questions/3864739/scroll-by-clicking-and-dragging-inside-div-instead-of-clicking-scrollbar */
    const sliders = document.querySelectorAll('.entretien--slider');

    sliders.forEach(slider => {

        let isDown = false;
        let startX;
        let scrollLeft;

        if (slider) {
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('is-dragging');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
                e.preventDefault();
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX);
                slider.scrollLeft = scrollLeft - walk;
            });

            // Version touch (mobile)
            slider.addEventListener('touchstart', (e) => {
                isDown = true;
                slider.classList.add('is-dragging');
                startX = e.touches[0].pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            }, { passive: true });

            slider.addEventListener('touchend', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            }, { passive: true });

            slider.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX - slider.offsetLeft;
                const walk = (x - startX);
                slider.scrollLeft = scrollLeft - walk;
            }, { passive: true });
        }
    });
};

if (page === "moteur.html") {
    afficherParties("MoteurIntro");
}
