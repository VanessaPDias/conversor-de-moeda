window.onload = atribuirEvento;

function atribuirEvento(){
  const botoesInverter = document.querySelectorAll(".inverter-moedas");
  botoesInverter.forEach(element => {
    element.onclick = inverter;
  });

  document.querySelector("#input-quantia").oninput = trocarValor;
  document.querySelector("#input-moeda-origem").oninput = trocarOpcaoOrigem;
  document.querySelector("#input-moeda-destino").oninput = trocarOpcaoDestino;
  converter()
}

function pegarValorDoInput() {
  let elementoValor = document.querySelector("#input-quantia").value;
 
  if(elementoValor == ""){
    elementoValor = 0
  }

  const virgula = /,/gi;
  const valorInicial = elementoValor.replace(virgula, '.');
  return parseFloat(valorInicial);
}

function pegarOrigemDoInput(){
  return document.querySelector("#input-moeda-origem").value;
}
function pegarDestinoDoInput(){
  return document.querySelector("#input-moeda-destino").value;
}



function pegarElementosResultado() {
  const valorMoedaOrigem = document.querySelector("#quantia-moedaOrigem");
  const simboloMoedaOrigem = document.querySelector("#simbolo-moeda-origem");
  const valorMoedaDestino = document.querySelector("#quantiaConvertida-moedaDestino");
  const valorUnitarioMoedaOrigem = document.querySelector("#valor-unitario-origem");
  const valorUnitarioMoedaDestino = document.querySelector("#valor-unitario-destino");

  return {valorMoedaOrigem, simboloMoedaOrigem, valorMoedaDestino, valorUnitarioMoedaOrigem, valorUnitarioMoedaDestino};
}

function imprimirResultadoNaTela(valorConvertido, simbolo, moedaOrigemSingular, moedaOrigemPlural, moedaDestinoSingular,moedaDestinoPlural, cotacao) {
  const valorDeEntrada = pegarValorDoInput();
  const origemDeEntrada = pegarOrigemDoInput();
  const destinoDeEntrada = pegarDestinoDoInput();  
  const elementosParaImprimirDados = pegarElementosResultado();
  if(valorDeEntrada > 1){
    moedaOrigemSingular = moedaOrigemPlural;
  };
  if(valorConvertido > 1){
    moedaDestinoSingular = moedaDestinoPlural;
  };

  elementosParaImprimirDados.simboloMoedaOrigem.innerHTML = simbolo;
  elementosParaImprimirDados.valorMoedaOrigem.innerHTML = `${valorDeEntrada} ${moedaOrigemSingular} = `;
  elementosParaImprimirDados.valorMoedaDestino.innerHTML = `${valorConvertido} ${moedaDestinoSingular}`
  elementosParaImprimirDados.valorUnitarioMoedaOrigem.innerHTML = `1 ${origemDeEntrada} = ${cotacao} ${destinoDeEntrada}`;
}

function converter(){
  const valorDeEntrada = pegarValorDoInput();
  const origemDeEntrada = pegarOrigemDoInput();
  const destinoDeEntrada = pegarDestinoDoInput(); 
  let chaveParaConversao = origemDeEntrada + "-" + destinoDeEntrada;
  let valorConvertido;
  let simbolo;
  let moedaOrigemSingular;
  let moedaOrigemPlural;
  let moedaDestinoSingular;
  let moedaDestinoPlural;
  let cotacao;
  

  for( let i = 0; i < moedas.length; i++){
    
    if(chaveParaConversao == moedas[i].chave){
      valorConvertido = valorDeEntrada * moedas[i].cotacao;
      simbolo = moedas[i].origem.simbolo;
      moedaOrigemSingular = moedas[i].origem.singular;
      moedaOrigemPlural = moedas[i].origem.plural;
      moedaDestinoSingular = moedas[i].destino.singular;
      moedaDestinoPlural = moedas[i].destino.plural;
      cotacao = moedas[i].cotacao;
    }
  }
  imprimirResultadoNaTela(valorConvertido, simbolo, moedaOrigemSingular, moedaOrigemPlural, moedaDestinoSingular, moedaDestinoPlural, cotacao)
}

function inverter(){
  const opcoesOrigem = document.querySelector("#input-moeda-origem");
  const opcoesDestino = document.querySelector("#input-moeda-destino");
  const oDestino = opcoesDestino.value;
  opcoesDestino.value = opcoesOrigem.value;
  opcoesOrigem.value = oDestino;

  const bandeiraOrigem = document.querySelector("#bandeira-origem");
  const bandeiraDestino = document.querySelector("#bandeira-destino");
  const bDestino = bandeiraDestino.src;
  bandeiraDestino.src = bandeiraOrigem.src;
  bandeiraOrigem.src = bDestino;

  converter()
}

function trocarValor(evento){
  let valorInput = evento.target.value;
  const re = /,/gi;
  const valor = valorInput.replace(re, '.');

  if(isNaN(valor)){
    document.querySelector("#msg-erro").innerHTML = `Informe um valor válido`;
  } else {
    document.querySelector("#msg-erro").innerHTML = "";
    converter()
  }
  
}

function trocarOpcaoOrigem(evento){
  const valorOpcaoOrigem = evento.target.value;

  document.querySelector("#bandeira-origem").src = `/img/${valorOpcaoOrigem}.png`;

  converter()
}

function trocarOpcaoDestino(evento){
  const valorOpcaoDestino = evento.target.value;

  document.querySelector("#bandeira-destino").src = `/img/${valorOpcaoDestino}.png`;
  converter()
}



  const moedas = [
    {
      chave: "USD-USD",
      cotacao: 1.00,
      origem: {
        simbolo: "$",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      } 
    },
    {
      chave: "USD-EUR",
      cotacao: 0.8675,
      origem: {
        simbolo: "$",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      } 
    },
    {
      chave: "USD-BRL",
      cotacao: 5.5328,
      origem: {
        simbolo: "$",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "USD-GBP",
      cotacao: 0.7364,
      origem: {
        simbolo: "$",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "EUR-EUR",
      cotacao: 1.000,
      origem: {
        simbolo: "€",
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Euro",
        plural: "Euros",
      }
    },
    {
      chave: "EUR-USD",
      cotacao: 1.1526,
      origem: {
        simbolo: "€",
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        simbolo: "€",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA",
      }
    },
    {
      chave: "EUR-BRL",
      cotacao: 6.3772,
      origem: {
        simbolo: "€",
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        simbolo: "€",
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "EUR-GBP",
      cotacao: 0.8486,
      origem: {
        simbolo: "€",
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "BRL-BRL",
      cotacao: 1.000,
      origem: {
        simbolo: "R$",
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "BRL-USD",
      cotacao: 0.1807,
      origem: {
        simbolo: "R$",
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      }
    },
    {
      chave: "BRL-EUR",
      cotacao: 0.1568,
      origem: {
        simbolo: "R$",
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      }
    },
    {
      chave: "BRL-GBP",
      cotacao: 0.1330,
      origem: {
        simbolo: "R$",
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "GBP-GBP",
      cotacao: 1.000,
      origem: {
        simbolo: "£",
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "GBP-USD",
      cotacao: 1.3581,
      origem: {
        simbolo: "£",
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      }
    },
    {
      chave: "GBP-EUR",
      cotacao: 1.1784,
      origem: {
        simbolo: "£",
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      }
    },
    {
      chave: "GBP-BRL",
      cotacao: 7.5146,
      origem: {
        simbolo: "£",
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        ssingular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    }
    
  ];
