const router = require('express').Router();
const Paciente = require('./models/pacientes');
const Medico = require('./models/medico');
const Procedimento= require('./models/procedimento');
router.get('/', async (req, res, next) => {
    var historico = await Procedimento.getHistoric(09343184417) ;
   
    res.send(historico);
});
// Login Paciente OK
router.post('/paciente/acesso', async (req, res, next) => {
    const {cpf, senha} = req.body;
    await Paciente.findByCpf(cpf).then(([paciente]) => {
        var acesso = Paciente.login(paciente[0].senha, senha);
        if(acesso) {
            req.session.cpf = cpf;
            req.session.pacienteLogged = true;
            res.redirect('/paciente/dashboard');
        } else {
            const error = {hasError: true, errorMsg: 'Login ou Senha incorreto!'}
            res.render('loginP', {error, cpf});
        }
    })
    .catch(err => {
        console.log(err);
        const error = {hasError: true, errorMsg: 'Algo deu errrado tente novamente!'}
            res.render('loginP', {error, cpf});
    });
   
});

router.get('/paciente/acesso', (req, res, next) => {
    res.render('loginP',{error: {hasError: false}, cpf: ''});
});
//Cadastro paciente OK
router.get('/paciente/cadastro', (req, res, next) => {
    res.render('registerP');
});
router.post('/paciente/cadastro', (req, res, next) => {
    const {cpf, nome, senha, senha2, datanascimento} = req.body;
    console.log(req.body);

    const novoPaciente = new Paciente(parseInt(cpf,10),nome, senha, datanascimento);
    novoPaciente.save();
    res.render('registerP');
});
router.get('/paciente/dashboard', async (req, res, next) => {
    if(req.session.pacienteLogged) {
        var historico = await Procedimento.getHistoric(req.session.cpf) ;
        
        res.render('dashboardP', {historico});
    } else {
        res.redirect('/paciente/acesso');
    }
});
router.get('/medico/acesso', (req, res, next) => {
    res.render('loginM');
});

router.post('/medico/acesso', async (req, res, next) => {
    const {crm, senha} = req.body;
    await Medico.findByCrm(crm).then(([medico]) => {
        var acesso = Medico.login(medico[0].senha, senha);
        if(acesso) {
            res.redirect('/medico/dashboard');
        } else {
            res.render('loginM');
        }
    });
});

//Cadastro Medico OK
router.get('/medico/cadastro', (req, res, next) => {
    res.render('registerM');
});
router.post('/medico/cadastro', (req, res, next) => {
    const {crm, nome, senha, especialidade} = req.body;
    const novoMedico = new Medico(crm, nome, senha, especialidade);
    novoMedico.save();
    res.render('registerM');
});


router.get('/medico/dashboard', (req, res, next) => {
    res.render('dashboardM');
});

router.post('/adicionarprocedimento', (req, res, next) => {
    const {crm, cpf, tipo, data, desc} = req.body;
    const novoProcedimento = new Procedimento(tipo, data, desc, crm, cpf);
    novoProcedimento.save();
    res.end();
}) 

router.get('/medico/perfil/:crm', async (req, res, next) => {
    Medico.findByCrm(req.params.crm)
        .then(([result]) => {
            const medico = result[0 ];         
            res.render('perfilM', {medico} );
        });
}); 
module.exports = router;