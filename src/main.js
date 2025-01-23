import './style.css'
import {loadLocalTextFile} from "./helper.js";
import {initLmStudio, predict} from "./lmStudio.js";
import * as specimensFiles from './specimens.json';
import {Specimen} from "./specimen.js";

let specimens = [];

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
        console.log(specimens[specimen.name].chatHistory);
    }
}


