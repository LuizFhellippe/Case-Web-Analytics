const b1 = 'broken_database_1.json'
const b2 = 'broken_database_2.json'

function lerArquivo(nome){
  try{
    var dado = require('./' + nome)
    return dado
  }catch(e){
    console.log('Arquivo não encontrado. Erro: ' + e.message)
    throw e
  }
}

function CorrigirNome(tipo, data){
  if(tipo == 'veiculo'){
    data = CorrigirVendas(data)
    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < data[i].nome.length; j++){
        data[i].nome = data[i].nome.replace('\xF8', 'o')
        data[i].nome = data[i].nome.replace('\xE6', 'a')
      }
    }
  }else if(tipo == 'marca'){
    for(var i in data){
      for(var j = 0; j < data.length; j++){
        data[i].marca = data[i].marca.replace('\xF8', 'o')
        data[i].marca = data[i].marca.replace('\xE6', 'a')
      }
    }
  }
  return data
}

function CorrigirVendas(data){
  for(var i in data){
    try{
      data[i].vendas = Number(data[i].vendas)
    }catch(e){
      console.log('A string está no formato errado. Objeto: ' + data[i])
      throw e
    }
  }
  return data
}

function exportaArquivo(nome, data){
  
  var fs = require('fs');
  
  const jsonData = JSON.stringify(data)
  
  fs.writeFileSync(nome, jsonData, 'utf-8', err => {
    if(err) throw err
  })
}


exportaArquivo(b2, CorrigirNome('marca', lerArquivo(b2)))
exportaArquivo(b1, CorrigirNome('veiculo', lerArquivo(b1)))