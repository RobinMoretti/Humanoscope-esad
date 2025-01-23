import {initialPrompt, initLmStudio, predict} from "./lmStudio.js";
import {randomIntFromInterval} from "./helper.js";
import interact from "interactjs";
import {dragMoveListener} from "./draggable.js";

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

        document.getElementById("").appendChild(this.generateElement());
        this.messagesContainer = document.querySelector("#" + this.name + " .messages-container");

        interact("#" + this.name).draggable({
            inertia: true,
            //   modifiers: [
            //     interact.modifiers.restrictRect({
            //       restriction: document.body,
            //       elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            //       endOnly: true,
            //     }),
            //   ],
            listeners: {
                start(event) {
                    const target = event.target;
                    const rect = target.getBoundingClientRect();
                    const parentRect = target.parentNode.getBoundingClientRect();

                    const x = rect.left - parentRect.left;
                    const y = rect.top - parentRect.top;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                    target.style.zIndex = 999;
                },
                move: dragMoveListener,
                end(event) {
                    const target = event.target;
                    const parentZIndex = parseInt(
                        window.getComputedStyle(event.target.parentNode).zIndex || 0
                    );
                    target.style.zIndex = parentZIndex + 1;
                },
            },
        });
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