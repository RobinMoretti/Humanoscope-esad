function infoOpener() {
    var ouvert = document.getElementById("historique_ouvert");
    var fermé = document.getElementById("historique_fermé");
    var texte = document.getElementById("texteHistorique");

    if (ouvert.style.display === "none" || ouvert.style.display === "") {
        ouvert.style.display = "block";
        texte.style.display = "block";  // Show texteHistorique
        fermé.style.display = "none";
    } else {
        ouvert.style.display = "none";
        texte.style.display = "none";  // Hide texteHistorique
        fermé.style.display = "block";
    }
}

function collectionOpener() {
    var ouvert = document.getElementById("collectionCadre");
    var fermé = document.getElementById("collectionHistorique");

    if (ouvert.style.display === "none" || ouvert.style.display === "") {
        ouvert.style.display = "block";
        fermé.style.display = "none";
    } else {
        ouvert.style.display = "none";
        fermé.style.display = "block";
    }
}