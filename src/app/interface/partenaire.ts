export interface addPartenaire{
    name : string,
    contact : string,
    phone : string,
    email : string,
    town : string,
    postalCode : string,
    rising : string,
    picture : File,
}

export interface getPartenaire{
    id: any,
    name : string,
    contact : string,
    phone : string,
    email : string,
    town : string,
    postalCode : string,
    rising : string,
    picture : File,
}