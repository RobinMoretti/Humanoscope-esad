import './style.css'

import {initLmStudio, predict} from "./lmStudio.js";


async function initGame(){
    await initLmStudio();
    const messages = [
        { role: "system", content: "Your are playing a game." },
        { role: "user", content: "where are you going ? plese turn right" },
    ];

    let response = await predict(messages);
}

initGame();

