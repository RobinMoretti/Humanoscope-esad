import {initialPrompt, initLmStudio, predict} from "./lmStudio.js";
import {randomIntFromInterval} from "./helper.js";
import interact from "interactjs";
import {moveElementToNewParent} from "./main.js";

export class Specimen {
    constructor(name, tableau) {
        this.name = name;
        this.initialPrompt = "";
        this.isTalking = false;
        this.tableau = tableau;
        this.container = null;
        this.messagesContainer = null;
        this.position = {x:0, y:0};
        this.positionInTableau = {x:0, y:0};
        this.chatHistory = [
            //{ role: "system", content: "Answer the following questions." },
            //{ role: "user", content: "What is the meaning of life?" },
        ]

        setTimeout(()=>{
            this.talk();
        }, 2000)
    }

    init(){
        console.log("init specimen")
        this.chatHistory.push({
            role:"user",
            content: initialPrompt + "Le personnage que tu dois incarner est " + this.name + "." +
                "Voici ça description :" + this.initialPrompt
        })

        document.getElementById("tableau-" + this.tableau).appendChild(this.generateElement());

        this.container =  document.querySelector("#" + this.name);
        this.messagesContainer = document.querySelector("#" + this.name + " .messages-container");

        interact("#" + this.name).draggable({
            inertia: true,
            listeners: {
                move: this.drag.bind(this),
                end(event) {
                    const target = event.target;
                    const parentZIndex = parseInt(
                        window.getComputedStyle(event.target.parentNode).zIndex || 0
                    );
                    target.style.zIndex = parentZIndex + 1;
                },
            },
        })
        .on('tap', function (event) {
            this.tap(event);
        }.bind(this));
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

            //if(response.)
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
        console.log(someoneElseName + " : " + messageFromSomeoneElse)
        this.chatHistory.push({
            role: "user",
            content: someoneElseName + " : " + messageFromSomeoneElse
        });

        console.log(this.chatHistory)
    }

    generateElement() {
        let divContainer = document.createElement("div");
        divContainer.classList.add("specimen");
        divContainer.id = this.name;

        let messagesContainer = document.createElement("div");
        messagesContainer.classList.add("messages-container");

        let name = document.createElement("div");
        name.classList.add("name");
        name.innerHTML = this.name;
        divContainer.appendChild(name);

        divContainer.appendChild(messagesContainer);

        return divContainer;
    }

    move(targetPositionX, targetPositionY) {
        this.position.y = targetPositionY;
        this.position.x = targetPositionX;

        this.container.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }

    drag(event) {
        const target = event.target;

        this.position.y += event.dy;
        this.position.x += event.dx;

        this.container.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }

    tap(event){
        //get touched
        // go back to collection
        if(!this.container.parentNode.classList.contains("tableau")){
            let tableau = document.querySelector("#tableau-" + this.tableau);
            moveElementToNewParent(this.container, tableau)
            this.move(10,10)
        }
        event.preventDefault()
    }
}