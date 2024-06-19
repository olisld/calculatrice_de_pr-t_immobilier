// import {jsPDF} from "jspdf"



// Default export is a4 paper, portrait, using millimeters for units
// const doc = new jsPDF();
// console.log(doc)

//récupération du formulaire  et du bouton pdf pour pouvoir récupérer et traiter les données à l'interieur de celui-ci
let formulaire= document.querySelector("#formulaire");
let PDF=document.querySelector('#bouton_pdf');

// soumission du formulaire pour récuper les données qu'utilise l'utilisateur
formulaire.addEventListener('submit',function(event){

// élément permettant d'annuler le refresh de la page lors du submit ce qui empêche de récuperer les données du formuliare correctement.
    event.preventDefault();

//récupération de seulement les champs du formulaiere
    let champ_montant_emprunté= document.querySelector('#emprunt')
    let champ_taux_nominal=document.querySelector('#taux_nominal')
    let champ_durée_remboursement=document.querySelector('#remboursement')
// récupération des éléments du formulaire
    let Montant_emprunté=document.querySelector('#emprunt').value
    let Taux_nominal=document.querySelector('#taux_nominal').value
    let Durée_remboursement=document.querySelector('#remboursement').value

// affichage de ses contenues dans la console
    console.log(Montant_emprunté)
    console.log(Taux_nominal)
    console.log(Durée_remboursement)

//conversion des données en nombres
    Montant_emprunté=parseInt(Montant_emprunté)
    Taux_nominal=parseInt(Taux_nominal)
    Durée_remboursement=parseInt(Durée_remboursement)

// Calcul sur les données nottament pour convertir ses données en mensualités
    let nombre_total_des_mensualités =Durée_remboursement*12
    let intérets_par_mois =(Taux_nominal/12)/100
    let échéance_mensuel=Montant_emprunté*(intérets_par_mois*((1+intérets_par_mois)**nombre_total_des_mensualités)/(((1+intérets_par_mois)**nombre_total_des_mensualités)-1))
    
    let tableau= document.querySelector("#tableau").getElementsByTagName('tbody')[0];
    let tableau2= document.querySelector('.tableau_amortissement')


//réalisation des fonctions de test pr les champs du formulaire

    function isNotEmpty(value){
    return value!='' && value!=0
    }

    function isint(value){
    return Number.isInteger(value)
    }

    function isGreaterThan(value,min){
 return value>min
    }

    function isLowerThan(value,max){
    return value<max
    }

    function validé_montant_emprunté(Montant_emprunté){
    if(
        isNotEmpty(Montant_emprunté)&&
        isint(Montant_emprunté)&&
        isGreaterThan(Montant_emprunté,1000)&&
        isLowerThan(Montant_emprunté,1000000)
    ){
        return true
    }
    else{
        return false
    }
    }

    function validé_taux_nominal(Taux_nominal){
    if(
        isNotEmpty(Taux_nominal)&&
        isint(Taux_nominal)&&
        isGreaterThan(Taux_nominal,0)&&
        isLowerThan(Taux_nominal,30)
    ){
        return true
    }
    else{
        return false
    }
    }

    function validé_durée_remboursement(Durée_remboursement){
    if(
        isNotEmpty(Durée_remboursement)&&
        isint(Durée_remboursement)&&
        isGreaterThan(Durée_remboursement,0)&&
        isLowerThan(Durée_remboursement,30)
    ){
        return true
    }
    else{
        return false
    }
    }

// console.log('montant emprunté: ',validé_montant_emprunté(Montant_emprunté))
// console.log('Taux nominal: ',validé_taux_nominal(Taux_nominal))
// console.log('Durée de remboursement: ',validé_durée_remboursement(Durée_remboursement))


// gérer le tableau d'erreur pour afficher ensuite le bon message d'erreur

//condition pour afficher ensuite les différents messages d'erreur pour les trois champs

    function affichage_erreur_durée_de_remboursement(){
        const erreur_durée_de_rembourssement= document.querySelector('.message_erreur_durée_de_remboursement')
        if (validé_durée_remboursement(Durée_remboursement)===false){
            console.log('ok remboursement')
            erreur_durée_de_rembourssement.innerHTML= '<b>Veuillez saisir une durée de remboursement valide</b>'
                // alert('champ de durée de remboursement invalide')
                tableau2.style.display='none'
                champ_durée_remboursement.classList.add('erreur')
                
        }
        else    {
            console.log('remboursement')
            tableau2.style.display='block'
            erreur_durée_de_rembourssement.innerHTML=''
            champ_durée_remboursement.classList.remove('erreur')
    }}


    function affichage_erreur_taux_nominal(){
        const erreur_taux_nominal= document.querySelector('.message_erreur_taux_nominal')

        if (validé_taux_nominal(Taux_nominal)===false){
            console.log('ok tauxnominal')
            erreur_taux_nominal.innerHTML= '<b>Veuillez saisir un taux nominal valide</b>'
                // alert('champ de durée de remboursement invalide')
                tableau2.style.display='none'
                champ_taux_nominal.classList.add('erreur')
                
        }
        else    {
            console.log('taux_nominal')
            tableau2.style.display='block'
            erreur_taux_nominal.innerHTML=''
            champ_taux_nominal.classList.remove('erreur')
    }}


    function affichage_erreur_montant_emprunté(){
        const erreur_montant_emprunté= document.querySelector('.message_erreur_montant_emprunté')
        if (validé_montant_emprunté(Montant_emprunté)===false){
            console.log('ok montant emprunté')
            erreur_montant_emprunté.innerHTML= '<b>Veuillez saisir un montant valide</b>'
                // alert('champ de durée de remboursement invalide')
                tableau2.style.display='none'
                champ_montant_emprunté.classList.add('erreur')
                
        }
        else    {
            console.log('montant')
            tableau2.style.display='block'
            erreur_montant_emprunté.innerHTML=''
            champ_montant_emprunté.classList.remove('erreur')
    }}


//appelle des fonctions d'affichage d'erreur des trois champs

    affichage_erreur_durée_de_remboursement()
    affichage_erreur_taux_nominal()
    affichage_erreur_montant_emprunté()


//La on rentre dans la boucle permettant d'afficher les lignes et de changer les valeurs à chaque itération
    for (mois=1;mois<=nombre_total_des_mensualités && Montant_emprunté>0;mois++){

//calcul permettant de changer les valeurs mois par mois
        let intérets_du_mois=Montant_emprunté*intérets_par_mois
        let amortissement_du_mois=échéance_mensuel-intérets_du_mois
        Montant_emprunté-=échéance_mensuel
        let solde_restant=Montant_emprunté
//bloc permettant d'insérer ses valeurs à chaque itération dans le tableau
        
        let row = tableau.insertRow();

        // Insert new cells for each value
        let cellMois = row.insertCell(0);
        let cellmontant = row.insertCell(1)
        let cellEcheanceMensuelle = row.insertCell(2);
        let cellInteretsDuMois = row.insertCell(3);
        let cellAmortissementDuMois = row.insertCell(4);
        let cellSoldeRestant = row.insertCell(5);

        // Fill cells with values
        cellMois.textContent = mois;
        cellmontant.textContent=(Montant_emprunté+échéance_mensuel).toFixed(2);
        cellEcheanceMensuelle.textContent = échéance_mensuel.toFixed(2);
        cellInteretsDuMois.textContent = intérets_du_mois.toFixed(2);
        cellAmortissementDuMois.textContent = amortissement_du_mois.toFixed(2);
        cellSoldeRestant.textContent = solde_restant.toFixed(2);

    }}
)

//Bloc permettant de gérer le téléchargement en pdf

PDF.addEventListener('click', ()=>{
    const tableaupdf= document.querySelector('.tableau_amortissement')
    // const { jsPDF } = window.jsPDF
    html2canvas(tableaupdf).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        const doc = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save the PDF with the filename "page.pdf"
        doc.save("tableaupdf.pdf");

    })
    
})
