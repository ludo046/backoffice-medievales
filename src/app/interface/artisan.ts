export interface getArtisans{
    id: any,
    name : string,
    contact : string,
    phone : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    price : string,
    taille : string
    picture : any,
}

export interface Addartisan{
    name : string,
    contact : string,
    phone : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    price : string,
    taille : string,
    picture : File,
}