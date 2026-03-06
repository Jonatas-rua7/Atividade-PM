algoritmo "Ex16"
var
   valorE, taxa, total: real
   parcelas, i: inteiro
inicio
   escreva("Valor do empréstimo: ")
   leia(valorE)
   escreva("Taxa de juros mensal (%): ")
   leia(taxa)
   escreva("Número de parcelas: ")
   leia(parcelas)

   total <- valorE
   para i de 1 ate parcelas faca
      total <- total * (1 + (taxa / 100))
   fimpara

   escreval("Valor final pago: R$ ", total:2:2)
   escreval("Total de juros: R$ ", (total - valorE):2:2)
fimalgoritmo
