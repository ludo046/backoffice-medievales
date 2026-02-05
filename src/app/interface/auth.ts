export interface loginModel{
    email: String;
    password: String;
}

export interface userModel {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  isAdmin: boolean;

  // Les flags ne sont pas obligatoires lors de la création, mais on les met pour homogénéité
  troupe?: boolean;
  campement?: boolean;
  artisan?: boolean;
  animation?: boolean;
  marche?: boolean;
  partenaire?: boolean;
}


export interface createPassword{
    email: String,
    code: String, 
    password: String
}

export interface getUserModel {
  id: number;

  firstname: string;
  lastname: string;
  phone: string;
  email: string;

  isAdmin: boolean;

  // Flags de permissions (mêmes noms que ta BDD Sequelize)
  troupe: boolean;
  campement: boolean;
  artisan: boolean;
  animation: boolean;
  marche: boolean;
  partenaire: boolean;
}
