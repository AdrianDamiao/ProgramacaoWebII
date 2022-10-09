const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const Handlebars = require('handlebars');
const PORT = 3000;

const dotenv = require('dotenv');
dotenv.config('./');

const app = express();

app.engine("hbs", expressHandlebars.engine({ defaultLayout: null }));

app.set("view engine", "hbs");

app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.set(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", {
    titulo: "Exercícios",
  });
});


//Exercício 1
app.get("/exercicio1", (req, res) => {
  res.render("exercicio1", {
    titulo: "Exercício 1",
  });
});

app.post("/exercicio1", (req, res) => {
  const valor = req.body.valor;

  let result;
  if (valor > 0) {
    result = "POSITIVO";
  } else if (valor == 0) {
    result = "ZERO";
  } else if (valor < 0) {
    result = "NEGATIVO";
  }

  res.render('exercicio1', { result, valor, titulo: "Exercício 1" });
});

// Exercício 2

Handlebars.registerHelper("tabuada", (numero) => {
  const tab = [];
  for (let i = 1; i <= 10; i++) {
    tab[i] = parseInt(numero) * i;
  }
  return tab;
});

app.get("/exercicio2", (req, res) => {
  const number = req.query.numberInput;

  res.render("exercicio2", {
    titulo: "Exercício 2",
    descricao:
      "Crie um programa que ao receber um valor numérico de um formulário (GET) exiba a tabuada desse número na tela.",
    numero: number,
  });
});

// Exercício 3
app.get("/exercicio3", (req, res) => {

  res.render("exercicio3", {
    titulo: "Exercício 3",
    descricao:
      "Crie um algoritmo para cálculo do IMC de uma pessoa. Obs.: utilize uma função para processar os dados recebidos.",
  });
});

let calculaIMC = (peso, altura) => (peso / (Math.pow(altura, 2))).toFixed(2);

const analiseIMC = IMC => {
  let resposta;

  if (IMC < 18.5) {
    resposta = "Você está abaixo do peso ideal";
  } else if (IMC >= 18.5 && IMC <= 24.9) {
    resposta = "Parabéns – Você está em seu peso normal!";
  } else if (IMC >= 25.0 && IMC <= 29.9) {
    resposta = "Você está acima de seu peso (sobrepeso)";
  } else if (IMC >= 30.0 && IMC <= 34.9) {
    resposta = "Obesidade grau I";
  } else if (IMC >= 35.0 && IMC <= 39.0) {
    resposta = "Obesidade grau II";
  } else if (IMC >= 40) {
    resposta = "Obesidade grau III";
  }

  return resposta;
};

app.post("/exercicio3", (req, res) => {
  const altura = req.body.altura;
  const peso = req.body.peso;

  const IMC = calculaIMC(peso, altura);

  const resposta = analiseIMC(IMC);

  const pesoMin = parseInt((18.5 * Math.pow(altura, 2)).toFixed(2));
  const pesoMax = parseInt((24.9 * Math.pow(altura, 2)).toFixed(2));
  const pesoMed = Number((pesoMin + pesoMax) / 2);

  res.render('exercicio3', { IMC, resposta, pesoMin, pesoMax, pesoMed, titulo: "Exercício 3" });
});


//Exercício 4
app.get("/exercicio4", (req, res) => {

  res.render("exercicio4", {
    titulo: "Exercício 4",
    descricao:
      "O custo de um carro novo ao consumidor é a soma do custo de fábrica com a porcentagem do distribuidor e dos impostos (aplicados ao custo de fábrica).Supondo que o percentual do distribuidor seja de 28% e os impostos de 45%, escreva um algoritmo para receber de um formulário o custo de fábrica de um carro, calcular e exibir o custo final do consumidor.",
  });
});

app.post("/exercicio4", (req, res) => {
  const precoFabrica = req.body.precoFabrica;

  const precoFinal = Number(precoFabrica) + Number(precoFabrica * 0.28) + Number(precoFabrica * 0.45);

  res.render('exercicio4', { precoFinal: precoFinal.toFixed(2), titulo: "Exercício 4" });
});

//Exercício 5
app.get("/exercicio5", (req, res) => {

  res.render("exercicio5", {
    titulo: "Exercício 5",
    descricao:
      "Escreva um algoritmo para receber de um formulário o salário mensal atual de um funcionário e o percentual de reajuste. Calcule e exiba o valor do novo salário.",
  });
});

app.post("/exercicio5", (req, res) => {
  const salario = req.body.salario;
  const reajuste = req.body.reajuste;

  const salarioReajustado = salario * ((reajuste / 100) + 1);

  res.render('exercicio5', { salarioReajustado, titulo: "Exercício 5" });
});

//Exercício 6
app.get("/exercicio6", (req, res) => {

  res.render("exercicio6", {
    titulo: "Exercício 6",
  });
});

app.post("/exercicio6", (req, res) => {
  const primeiraNota = Number(req.body.nota1);
  const segundaNota = Number(req.body.nota2);
  const terceiraNota = Number(req.body.nota3);

  const media = parseInt((primeiraNota + segundaNota + terceiraNota) / 3).toFixed(2);
  let resultado;

  if (media >= 6)
    resultado = 'Aprovado';
  else
    resultado = 'Reprovado';

  res.render('exercicio6', { media, resultado, titulo: "Exercício 6" });
});

//Exercício 7
app.get("/exercicio7", (req, res) => {

  res.render("exercicio7", {
    titulo: "Exercício 7",
  });
});

app.post("/exercicio7", (req, res) => {
  const horas = Number(req.body.horas);
  const salario = Number(req.body.salario);

  let salarioTotal = 0;
  const horaRegular = 40 * 4;

  if (horas > horaRegular) {
    salarioTotal = (horaRegular * salario) + ((horas - horaRegular) * (salario * 1.5));
  } else if (horas <= horaRegular) {
    salarioTotal = horas * salario;
  }

  salarioTotal = parseInt(salarioTotal).toFixed(2);

  res.render('exercicio7', { salarioTotal, titulo: "Exercício 7" });
});

//Exercício 8
app.get("/exercicio8", (req, res) => {

  res.render("exercicio8", {
    titulo: "Exercício 8",
  });
});

app.post("/exercicio8", (req, res) => {
  const salarioFixo = Number(req.body.salarioFixo);
  const valorDasVendas = Number(req.body.vendas);

  let comissao = 0;

  comissao += valorDasVendas * 0.03;

  if (valorDasVendas > 1500) {
    comissao += (valorDasVendas - 1500) * 0.05;
  }

  const salarioAtual = parseInt(salarioFixo + comissao).toFixed(2);
  res.render('exercicio8', { salarioAtual, titulo: "Exercício 8" });
});

//Exercício 9
app.get("/exercicio9", (req, res) => {
  res.render("exercicio9", {
    titulo: "Exercício 9",
  });
});

app.post("/exercicio9", (req, res) => {
  const litros = Number(req.body.litros);
  const tipo = req.body.tCombustivel;

  let valor;
  let valorGasolina = litros * 3.30;
  let valorAlcool = litros * 2.90;

  if (tipo == "gasolina") {
    if (litros > 20) {
      valor = valorGasolina - (valorGasolina * 0.05);
    }
    else if (litros <= 20) {
      valor = valorGasolina - (valorGasolina * 0.03);
    }
  } else if (tipo == "alcool") {
    if (litros > 20) {
      valor = valorAlcool - (valorAlcool * 0.06);
    }
    else if (litros <= 20) {
      valor = valorAlcool - (valorAlcool * 0.04)
    }
  }

  valor = parseInt(valor).toFixed(2);

  res.render('exercicio9', { valor, titulo: "Exercício 9" });
});

//Exercício 10
const podeAposentar = (idade, tempoDeTrabalho) => {
  return (idade >= 65) || (tempoDeTrabalho >= 30) || (idade >= 60 && tempoDeTrabalho >= 25);
}

app.get("/exercicio10", (req, res) => {
  res.render("exercicio10", {
    titulo: "Exercício 10",
  });
});

app.post("/exercicio10", (req, res) => {

  const anoDeNascimento = Number(req.body.anoDeNascimento);
  const anoDeIngresso = Number(req.body.anoDeIngresso);
  let resposta;


  const idadeDoFuncionario = (new Date().getFullYear() - parseInt(anoDeNascimento));
  const tempoDeTrabalho = (new Date().getFullYear() - parseInt(anoDeIngresso));

  if (idadeDoFuncionario >= tempoDeTrabalho) {
    resposta = `${podeAposentar(idadeDoFuncionario, tempoDeTrabalho) ? 'REQUERER APOSENTADORIA' : 'NÃO REQUERER APOSENTADORIA'}`;
  } else {
    resposta = '<strong>A data de ingresso na empresa não pode ser menor que a data de nascimento!</strong>';
  }

  res.render('exercicio10', { idadeDoFuncionario, tempoDeTrabalho, resposta, titulo: "Exercício 10" });
});

//Exercício 11
app.get("/exercicio11", (req, res) => {
  res.render("exercicio11", {
    titulo: "Exercício 11",
  });
});

app.post("/exercicio11", (req, res) => {

  const nome = req.body.nome;
  const email = req.body.email;
  const cpf = req.body.cpf;
  const idade = req.body.idade;

  res.render('exercicio11', { nome, email, cpf, idade, titulo: "Exercício 11" });
});

app.listen(PORT, () => {
  console.log(`Servidor Iniciado com sucesso na porta ${PORT}.`);
});
