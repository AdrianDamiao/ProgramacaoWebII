const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const { addAbortSignal } = require("stream");
const PORT = process.env.PORT || 3000;

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
    descricao:
      "Crie um programa que receba um valor numérico de um formulário (POST) e exiba na tela se o valor é POSITIVO, NEGATIVO ou IGUAL A ZERO.",
  });

});

app.post("/exercicio1", (req, res) => {
  const valor = req.body.valor;
  console.log(valor);

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
app.get("/exercicio2", (req, res) => {
  const number = req.query.numberInput;
  console.log(number);

  res.render("exercicio2", {
    titulo: "Exercício 2",
    descricao:
      "Crie um programa que ao receber um valor numérico de um formulário (GET) exiba a tabuada desse número na tela.",
    number: number,
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

  const pesoMin = (18.5 * Math.pow(altura, 2)).toFixed(2);
  const pesoMax = (24.9 * Math.pow(altura, 2)).toFixed(2);
  const pesoMed = (pesoMin + pesoMax) / 2;
  console.log(pesoMed);


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

  console.log(precoFinal);

  res.render('exercicio4', { precoFinal, titulo: "Exercício 4" });
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

  const media = (primeiraNota + segundaNota + terceiraNota) / 3;
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

  const salarioAtual = salarioFixo + comissao;
  res.render('exercicio8', { salarioAtual, titulo: "Exercício 8" });
});

app.listen(PORT, () => {
  console.log(`Servidor Iniciado com sucesso na porta ${PORT}.`);
});
