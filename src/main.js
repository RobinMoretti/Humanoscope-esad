import './style.css'
import {loadLocalTextFile} from "./helper.js";
import {initLmStudio, predict} from "./lmStudio.js";
import * as specimensFiles from './specimens.json';
import {Specimen} from "./specimen.js";

let specimens = [];

let observatory = []

initGame();

async function initGame(){
    await initLmStudio();
    await loadAllSpecimens();
}

async function loadAllSpecimens(){
    for(let specimen of specimensFiles.specimens){
        console.log(specimen);
        let newSpecimen = new Specimen(specimen.name);
        specimens[specimen.name] = newSpecimen;
        specimens[specimen.name].initialPrompt = await loadLocalTextFile("public/Specimens/Trump.txt");
        specimens[specimen.name].init();
    }

    specimens["Donald Trump"].startTalking();
}


document.getElementById("test-interaction").addEventListener("click",()=>{
    specimens["Donald Trump"].hearSomeoneElse("You missed me donald.","Nancy Pelosi");
})

