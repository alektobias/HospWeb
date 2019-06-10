const db = require('../utils/db');
const bcrypt = require('bcryptjs');

module.exports = class Medico {
    constructor(crm, nome, senha, especialidade,) {
        this.crm = crm;
        this.nome = nome;
        this.especialidade = especialidade;
        this.senha = senha;
    }
    save() {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.senha, salt);
        return db.execute(
            'INSERT INTO medico (crm, nome, senha, especialidade) VALUES (?, ?, ?, ?)',
            [parseInt(this.crm, 10), this.nome, hash, this.especialidade]
          ); 
    }
    static async findByCrm(crm) {
        return (await db.execute(`SELECT * FROM medico WHERE medico.crm=${parseInt(crm, 10)}`));
    }
    static login(hashed, senha) {
        return (bcrypt.compareSync(senha, hashed));
    }
}