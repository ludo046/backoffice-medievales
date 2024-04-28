export interface addtroupe{
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

export interface getTroupe{
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