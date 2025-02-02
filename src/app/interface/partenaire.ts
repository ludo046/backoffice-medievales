export interface addPartenaire{
    partenaireName : string,
    contact : string,
    email : string,
    phone : string,
    formule : string,
    montant : string,
    adresse : string,
    reglement : string,
    site : string,
    texte : string,
    picture : File,
}

export interface getPartenaire{
    id: any,
    partenaireName : string,
    contact : string,
    email : string,
    phone : string,
    formule : string,
    montant : string,
    adresse : string,
    reglement : string,
    site : string,
    texte : string,
    picture : File,
    activate : string
}