import {maxDistanceToBeHear} from "./specimen.js";

export class Observatory {
    constructor() {
        this.specimens = [];
        setInterval(this.update.bind(this), 250);
    }

    update(){
        for(let specimen of this.specimens){
            specimen.canBeHearBy = [];
            specimen.otherSpecimensSituation = "";

            for(let otherSpecimen of this.specimens) {
                if (specimen !== otherSpecimen) {
                    let distance = Math.sqrt(
                        Math.pow(specimen.position.x - otherSpecimen.position.x, 2) +
                        Math.pow(specimen.position.y - otherSpecimen.position.y, 2)
                    );

                    if(distance < maxDistanceToBeHear) {
                        specimen.canBeHearBy.push(otherSpecimen);

                        if(otherSpecimen.position.x < specimen.position.x){
                            specimen.otherSpecimensSituation += otherSpecimen.name + " is on your left, ";
                        }
                        else{
                            specimen.otherSpecimensSituation += otherSpecimen.name + " is on your right, ";
                        }

                        if(otherSpecimen.position.y < specimen.position.y){
                            specimen.otherSpecimensSituation += " and below you. ";
                        }
                        else{
                            specimen.otherSpecimensSituation += " and above you. ";
                        }
                    }
                }
            }
        }
    }

    addSpeciment(specimen) {
        this.specimens.push(specimen);
        specimen.startTalking();
    }

    removeSpeciment(specimen) {
        const index = sourceArray.indexOf(entity);
        if (index > -1) {
            sourceArray.splice(index, 1); // Remove the entity from the source array
            destinationArray.push(entity); // Add the entity to the destination array
        }
    }

}