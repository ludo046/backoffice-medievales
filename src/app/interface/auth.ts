export interface loginModel{
    email: String;
    password: String;
}

export interface userModel{
    firstname : String,
    lastname : String,
    phone : String,
    email : String,
    password : string,
    isAdmin : Boolean
}

export interface createPassword{
    email: String,
    code: String, 
    password: String
}