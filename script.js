let formulaire= document.querySelector("#formulaire");

// soumission du formulaire pour récuper les données qu'utilise l'utilisateur
formulaire.addEventListener('submit',function(event){

// élément permettant d'annuler le refresh de la page lors du submit ce qui empêche de récuperer les données du formuliare correctement.
    event.preventDefault();

// récupération des éléments du formulaire
    let Montant_emprunté=document.querySelector('#emprunt').value
    let Taux_nominal=document.querySelector('#taux_nominal').value
    let Durée_remboursement=document.querySelector('#remboursement').value

// affichage de ses contenues dans la console
    console.log(Montant_emprunté)
    console.log(Taux_nominal)
    console.log(Durée_remboursement)

//conversion des données en nombres
    parseFloat(Montant_emprunté)
    parseFloat(Taux_nominal)
    parseFloat(Durée_remboursement)
// Calcul sur les données

})
