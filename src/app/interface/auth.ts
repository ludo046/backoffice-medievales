export interface loginModel{
    email: String;
    password: String;
}

export interface userModel{
    firstname : String,
    lastname : String,
    phone : String,
    email : String,
    isAdmin : Boolean
}

export interface createPassword{
    email: String,
    code: String, 
    password: String
}

export interface getUserModel{
    id : string,
    firstname : String,
    lastname : String,
    phone : String,
    email : String,
    isAdmin : Boolean
}