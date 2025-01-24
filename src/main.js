import './style.css'
import {loadLocalTextFile} from "./helper.js";
import {initLmStudio, predict} from "./lmStudio.js";
import * as specimensFiles from './specimens.json';
import {Specimen} from "./specimen.js";
import {Observatory} from "./Observatory.js";
import interact from 'interactjs';

let specimens = [];

let observatory;

let collection = [];

initGame();

async function initGame() {
    initHtml();

    await initLmStudio();
    await loadAllSpecimens();
    observatory = new Observatory();

}

async function loadAllSpecimens() {
    for (let specimen of specimensFiles.specimens) {
        console.log(specimen);
        let newSpecimen = new Specimen(specimen.name, specimen.tableau);

        specimens[specimen.name] = newSpecimen;
        specimens[specimen.name].initialPrompt = await loadLocalTextFile("./public/Specimens/" + specimen.name + ".txt");
        console.log("./public/Specimens/" + specimen.name + ".txt")
        console.log(specimens[specimen.name].initialPrompt)
        specimens[specimen.name].init();

        // add or create a tableau in collection from specimen
        if (collection.find(tableau => tableau.name === specimen.tableau)) {
            collection.find(tableau => tableau.name === specimen.tableau).specimens.push(specimen);
        } else {
            collection.push(
                {
                    name: specimen.tableau,
                    specimens: []
                })
        }
    }
}

document.getElementById("test-interaction").addEventListener("click", () => {
    //moveSpecimenFromTableauToObservatory(specimens["donald-trump"]);
    specimens["donald-trump"].hearSomeoneElse("You missed me donald.", "Nancy Pelosi, your nemesis")
})

function moveSpecimenFromTableauToObservatory(specimen) {
    observatory.specimens.push(specimen);
    collection.find(tableau => tableau.name === specimen["tableau"]).specimens.splice(specimen);
    specimen.startTalking();
}

export function moveSpecimenFromObservatoryToTableau(specimen) {
    observatory.specimens.splice(specimen);
    collection.find(tableau => tableau.name === specimen["tableau"]).specimens.push(specimen);
    specimen.stopTalking();
}

/*interact(".dragDrop").draggable({
    listeners: {
        move(event) {
            dragMoveListener(event);
        },
    },
});*/

function initHtml(){
    // active clickable items for collection
    const listItems = document.querySelectorAll("li");

    listItems.forEach((item) => {
        item.addEventListener("click", function () {
            if (this.classList.contains("clicked")) {
                return;
            }

            const openItems = document.querySelectorAll(".clicked");

            if (openItems.length > 0) {
                openItems.forEach((openItem) => {
                    openItem.classList.remove("clicked");
                });
                this.addEventListener(
                    "transitionend",
                    () => {
                        this.classList.add("clicked");
                    },
                    {once: true}
                );
            } else {
                this.classList.add("clicked");
            }
        });
    });

    document.querySelectorAll(".close-btn").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            this.parentElement.classList.remove("clicked");
        });
    });

    initDropZones();
}

function infoOpener() {
    var ouvert = document.getElementById("historique_ouvert");
    var fermé = document.getElementById("historique-ferme");
    var texte = document.getElementById("texteHistorique");

    if (ouvert.style.display === "none" || ouvert.style.display === "") {
        ouvert.style.display = "block";
        texte.style.display = "block";  // Show texteHistorique
        fermé.style.display = "none";
    } else {
        ouvert.style.display = "none";
        texte.style.display = "none";  // Hide texteHistorique
        fermé.style.display = "block";
    }
}

function collectionOpener() {
    var ouvert = document.getElementById("collectionCadre");
    var fermé = document.getElementById("collectionHistorique");

    if (ouvert.style.display === "none" || ouvert.style.display === "") {
        ouvert.style.display = "block";
        fermé.style.display = "none";
    } else {
        ouvert.style.display = "none";
        fermé.style.display = "block";
    }
}

function initDropZones(){
    interact('.dropzone').dropzone({
        accept: '.specimen',
        overlap: 0.75,
        ondrop: function (event) {
            if(event.relatedTarget.parentNode !== event.currentTarget) {
                moveElementToNewParent(event.relatedTarget, event.currentTarget)
                moveSpecimenFromTableauToObservatory(specimens[event.relatedTarget.id]);
            }
        },
    })
}

export function moveElementToNewParent(element, newParent) {
    // Get the current position of the element relative to the document
    const rect = element.getBoundingClientRect();
    const docX = rect.left + window.scrollX;
    const docY = rect.top + window.scrollY;

    // Append the element to the new parent
    newParent.appendChild(element);

    // Get the new parent's position relative to the document
    const newParentRect = newParent.getBoundingClientRect();
    const newParentX = newParentRect.left + window.scrollX;
    const newParentY = newParentRect.top + window.scrollY;

    // Calculate the new position relative to the new parent
    const newX = docX - newParentX;
    const newY = docY - newParentY;

    // find the specimen with id
    let specimen = specimens[element.id];
    console.log()
    specimen.move(newX, newY);
    // Apply the translate transformation to maintain the same visual position
    //element.style.transform = `translate(${newX}px, ${newY}px)`;
}