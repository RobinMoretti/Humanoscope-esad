import './style.css'
import {loadLocalTextFile} from "./helper.js";
import {initLmStudio, predict} from "./lmStudio.js";
import * as specimensFiles from './specimens.json';
import {Specimen} from "./specimen.js";
import {Observatory} from "./Observatory.js";

let specimens = [];

let observatory;

let collection = [
];

initGame();

async function initGame(){
    await initLmStudio();
    await loadAllSpecimens();
    observatory = new Observatory();
}

async function loadAllSpecimens(){
    for(let specimen of specimensFiles.specimens){
        console.log(specimen);
        let newSpecimen = new Specimen(specimen.name, specimen.tableau);
        specimens[specimen.name] = newSpecimen;
        specimens[specimen.name].initialPrompt = await loadLocalTextFile("public/Specimens/Trump.txt");
        specimens[specimen.name].init();

        // add or create a tableau in collection from specimen
        if(collection.find(tableau => tableau.name === specimen.tableau)){
            collection.find(tableau => tableau.name === specimen.tableau).specimens.push(specimen);
        }
        else{
            collection.push(
                {
                    name: specimen.tableau,
                    specimens: []
                })
        }
    }
}

document.getElementById("test-interaction").addEventListener("click",()=>{
    moveSpecimenFromTableauToObservatory(specimens["donald-trump"]);
})

function moveSpecimenFromTableauToObservatory(specimen){
    observatory.specimens.push(specimen);
    collection.find(tableau => tableau.name === specimen["tableau"]).specimens.splice(specimen);
    specimen.startTalking();
}

function moveSpecimenFromObservatoryToTableau(specimen){
    /*collection.push(specimen);
    observatory.find(tableau => tableau.name === specimen.tableau).specimens.splice(specimen);*/
}


interact(".dragDrop").draggable({
  listeners: {
    move(event) {
      dragMoveListener(event);
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
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
          { once: true }
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
});
