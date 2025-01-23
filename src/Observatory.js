export class Observatory {
    constructor() {
        this.specimens = [];
        setInterval(this.update, 250);
    }

    update(){
        console.log("update");
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