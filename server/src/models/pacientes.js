const db = require('../utils/db');
const bcrypt = require('bcryptjs');
module.exports = class Paciente {
    constructor(cpf, nome, senha, datanascimento='', obs='') {
        this.cpf = cpf;
        this.nome = nome;
        this.datanascimento = datanascimento;
        this.senha = senha;
        this.obs = obs;
    }
    save() {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.senha, salt);
        return db.execute(
            'INSERT INTO paciente (cpf, nome, senha, datanascimento) VALUES (?, ?, ?, ?)',
            [this.cpf, this.nome, hash, this.datanascimento]
          ); 
    }
    static async findByCpf(cpf) {
        return (await db.execute(`SELECT * FROM paciente WHERE paciente.cpf=${cpf}`));
    }
    static login(hashed, senha) {
        return (bcrypt.compareSync(senha, hashed));
    }
}