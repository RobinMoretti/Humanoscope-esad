export class Observatory {
    constructor() {
        this.specimens = [];
        setInterval(this.update.bind(this), 250);
    }

    update(){
        for(let specimen of this.specimens){
            specimen.canBeHearBy = [];

            for(let otherSpecimen of this.specimens) {
                if (specimen !== otherSpecimen) {
                    let distance = Math.sqrt(
                        Math.pow(specimen.position.x - otherSpecimen.position.x, 2) +
                        Math.pow(specimen.position.y - otherSpecimen.position.y, 2)
                    );
                    console.log("distance", distance)
                    if(distance < 400) {
                        specimen.canBeHearBy.push(otherSpecimen);
                    }
                }
            }

            console.log(specimen.name, specimen.canBeHearBy.length);
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