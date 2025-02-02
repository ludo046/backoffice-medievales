export interface getCampements{
    id: any,
    companieName : string,
    contact : string,
    email: string,
    phone : string,
    person: string,
    ville : string,
    pays : string,
    postalCode : string,
    description : string,
    price : string,
    picture : any,
    activate: string
}

export interface addcampement{
    name : string,
    contact : string,
    email : string
    phone : string,
    person : string,
    town : string,
    contry : string,
    postalCode : string,
    description : string,
    price : string,
    picture : File,
}