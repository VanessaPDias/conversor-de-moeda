
function pegarDadosInput() {
  const valor = parseFloat(document.querySelector("#input-quantia").value);
  
  const opcoesOrigem = document.querySelector("#input-moeda-origem");
  const opcaoOrigemSelecionada = opcoesOrigem.options[opcoesOrigem.selectedIndex].value;
  
  const opcoesDestino = document.querySelector("#input-moeda-destino");
  const opcaoDestinoSelecionada = opcoesDestino.options[opcoesDestino.selectedIndex].value;
  
  return {valor, opcaoOrigemSelecionada, opcaoDestinoSelecionada}
}

function converter(){
  let dadosParaConversao = pegarDadosInput();
  
  let chaveParaConversao = dadosParaConversao.opcaoOrigemSelecionada + "-" + dadosParaConversao.opcaoDestinoSelecionada;
  
  for(let i = 0; i < moedas.length; i++){
    if(moedas[i].chave == chaveParaConversao){
      const valorConvertido = moedas[i].cotacao * dadosParaConversao.valor;
      
      console.log(chaveParaConversao, valorConvertido)
    }
  }
  
}

  const moedas = [
    {
      chave: "USD-EUR",
      origem: "Dólar dos EUA",
      destino: "Euro",
      cotacao: 0.86
    },
    {
      chave: "USD-BRL",
      origem: "Dólar dos EUA",
      destino: "Real Brasileiro",
      cotacao: 5.50
    },
    {
      chave: "USD-GBP",
      origem: "Dólar dos EUA",
      destino: "Libra Esterlina",
      cotacao: 0.73
    },
    {
      chave: "EUR-USD",
      origem: "Euro",
      destino: "Dólar dos EUA",
      cotacao: 1.15
    },
    {
      chave: "EUR-BRL",
      origem: "Euro",
      destino: "Real Brasileiro",
      cotacao: 6.37
    },
    {
      chave: "EUR-GBP",
      origem: "Euro",
      destino: "Libra Esterlina",
      cotacao: 0.84
    },
    {
      chave: "BRL-USD",
      origem: "Real Brasileiro",
      destino: "Dólar dos EUA",
      cotacao: 0.18
    },
    {
      chave: "BRL-EUR",
      origem: "Real Brasileiro",
      destino: "Euro",
      cotacao: 0.15
    },
    {
      chave: "BRL-GBP",
      origem: "Real Brasileiro",
      destino: "Libra Esterlina",
      cotacao: 0.13
    },
    {
      chave: "GBP-USD",
      origem: "Libra Esterlina",
      destino: "Dólar dos EUA",
      cotacao: 1.36
    },
    {
      chave: "GBP-EUR",
      origem: "Libra Esterlina",
      destino: "Euro",
      cotacao: 1.17
    },
    {
      chave: "GBP-BRL",
      origem: "Libra Esterlina",
      destino: "Real Brasileiro",
      cotacao: 7.50
    }
    
  ];
