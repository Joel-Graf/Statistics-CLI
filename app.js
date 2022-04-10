const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const prompt = require('prompt-sync')();

run();

function run() {
  if (argv.p && argv.p > 0) {
    const dataset = []

    for (let i = 0; i < argv.p; i++) {
      const n = prompt(`[${i + 1}]: `)
      dataset.push(Number(n))
    }
    dataset.sort()

    console.log("Dataset: ", dataset)
    console.log("População: ", dataset.length)
    console.log("Mediana: ", calcMediana(dataset))
    
    const media = calcMedia(dataset)
    console.log("Média: ", round(media))

    frequencias(dataset)
    dispersao(dataset, media)
  }
}

function calcMedia(dataset = []) {
  const soma = dataset.reduce((acc, cur) => acc + cur, 0);
  return soma / dataset.length
}

function calcMediana(dataset = []) {
  return dataset.length % 2 == 0
    ? [
      dataset[dataset.length / 2 - 1],
      dataset[dataset.length / 2]
    ]
    : dataset[(dataset.length - 1) / 2]
}

function frequencias(dataset = []) {
  console.log("-- FREQUENCIAS --")

  const total = dataset.reduce((acc, cur) => acc + cur)
  console.log("Total: ", total)

  dataset.reduce((acc, cur) => {
    const accumulator = acc + cur
    console.log(`Absoluta: ${cur} // Acumulada: ${accumulator} // Relativa: ${round((cur * 100) / total)} // Acumulada: ${round((accumulator * 100) / total)}`)

    return accumulator
  }, 0)

  console.log("-----------------")
}


function dispersao(dataset = [], media) {
  console.log("-- DISPERSAO --")

  const desvioQ = dataset.reduce((acc, cur) => acc + ((cur - media) * (cur - media)), 0)

  console.log("DesvioQ: ", round(desvioQ))

  const varP = desvioQ / dataset.length
  console.log("Variância P: ", round(varP))
  console.log("Desvio Padrão P: ", round(Math.sqrt(varP)))

  const varA = desvioQ / (dataset.length - 1)
  console.log("Variância A: ", round(varA))
  console.log("Desvio Padrão A: ", round(Math.sqrt(varA)))

  console.log("---------------")
}

function round(number) {
  return Math.round(number * 1000) / 1000
}