export interface getCampements{
    id: any,
    name : string,
    contact : string,
    phone : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    price : string,
    picture : any,
}

export interface addcampement{
    name : string,
    contact : string,
    phone : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    price : string,
    picture : File,
}