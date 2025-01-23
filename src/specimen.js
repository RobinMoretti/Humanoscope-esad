import {initialPrompt, initLmStudio, predict} from "./lmStudio.js";

export class Specimen {
    constructor(name) {
        this.name = name;
        this.initialPrompt = "";
        this.chatHistory = [
            //{ role: "system", content: "Answer the following questions." },
            //{ role: "user", content: "What is the meaning of life?" },
        ]

        setTimeout(()=>{
            this.talk();
        }, 2000)
    }

    init(){
        this.chatHistory.push({
            role:"user",
            content: initialPrompt + "Le personnage que tu dois incarner est " + this.name + "." +
                "Voici ça description :" + this.initialPrompt
        })
    }

    async talk(){
        this.chatHistory.push({
            role:"user",
            content: "exprime toi avec une courte phrase, comme une exclamation."
        })

        let response = await predict(this.chatHistory);

        console.log(response);
    }
}