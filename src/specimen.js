import {initialPrompt, initLmStudio, predict} from "./lmStudio.js";
import {randomIntFromInterval} from "./helper.js";

export class Specimen {
    constructor(name) {
        this.name = name;
        this.initialPrompt = "";
        this.isTalking = false;
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
        setTimeout(async ()=>{
            this.chatHistory.push({
                role:"user",
                content: "exprime toi avec une courte phrase, comme une exclamation. et tourne vers la gauche"
            })

            let response = await predict(this.chatHistory);
            console.log(response.message)
            this.chatHistory.push({
                role: "system",
                content: response.message
            });
            this.talk();
        }, randomIntFromInterval(1000, 2000))
    }

    startTalking(){
        this.isTalking = true;
        this.talk()
    }

    stopTalking(){
        this.isTalking = false;
    }

    hearSomeoneElse(messageFromSomeoneElse, someoneElseName){
        this.chatHistory.push({
            role: "user",
            content: someoneElseName + " : " + messageFromSomeoneElse
        });

    }
}