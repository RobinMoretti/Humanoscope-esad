import {initialPrompt, initLmStudio, predict} from "./lmStudio.js";
import {randomIntFromInterval} from "./helper.js";

export class Specimen {
    constructor(name, tableau) {
        this.name = name;
        this.initialPrompt = "";
        this.isTalking = false;
        this.tableau = tableau;
        this.messagesContainer = null;
        this.position = {x:0, y:0};
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

        document.getElementById("collection-container").appendChild(this.generateElement());
        this.messagesContainer = document.querySelector("#" + this.name + " .messages-container");
        console.log("this.messagesContainer", this.messagesContainer)
    }

    async talk(){
        setTimeout(async ()=>{
            this.chatHistory.push({
                role:"user",
                content: "exprime toi avec une courte phrase, comme une exclamation. et tourne vers la gauche"
            })

            let response = await predict(this.chatHistory);

            this.chatHistory.push({
                role: "system",
                content: response.message
            });

            let messageElement = document.createElement("div");
            messageElement.innerHTML = response.message;
            this.messagesContainer.appendChild(messageElement)

            setTimeout(()=>{
                messageElement.remove();
            }, 3000);

            console.log(response.actions.move)
            //if(response.)
            this.talk();
        }, randomIntFromInterval(5000, 5000))
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

    generateElement() {
        let divContainer = document.createElement("div");
        divContainer.classList.add("specimen");
        divContainer.id = this.name;

        let messagesContainer = document.createElement("div");
        messagesContainer.classList.add("messages-container");

        divContainer.appendChild(messagesContainer);

        return divContainer;
    }
}