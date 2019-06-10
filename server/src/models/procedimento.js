const db = require('../utils/db');
const Medico = require('../models/medico');

module.exports = class Procedimento {
    constructor(tipo, data, descricao, crm, cpf) {
        this.tipo = tipo;
        this.data = data;
        this.descricao = descricao;
        this.crm = crm;
        this.cpf = cpf;
    }
    save() {
        return(db.execute('INSERT INTO procedimento (tipo, data, descricao, crm_medico, cpf_paciente) VALUES (?, ?, ?, ?, ?)',
        [this.tipo, this.data, this.descricao, this.crm, this.cpf]));
    }
    static async getHistoric(cpf){
         var historic = db.execute(`SELECT * FROM procedimento WHERE procedimento.cpf_paciente=${parseInt(cpf,10)}`)
         .then( ([results]) => {
            
            var teste = results.filter( (result) => result.tipo === 'teste');
            var exame = results.filter( (result) => result.tipo === 'exame');
            var consulta = results.filter( (result) => result.tipo === 'consulta');
            var prontuario = results.filter( (result) => result.tipo === 'prontuario');   
            
            return ({ teste, exame, consulta, prontuario });
        })
        .catch(err => {
            return console.log(err);
        })
        
        return(historic);
    }
}