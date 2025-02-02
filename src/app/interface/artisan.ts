export interface getArtisans{
    id: any,
    companieName : string,
    contact : string,
    phone : string,
    email : string,
    ville : string,
    pays : string,
    postalCode : string,
    description : string,
    person : string,
    price : string,
    taille : string
    picture : any,
    activate : string
}

export interface AddArtisans{
    name : string,
    contact : string,
    phone : string,
    email : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    person : string,
    price : string,
    taille : string,
    picture : File,
}