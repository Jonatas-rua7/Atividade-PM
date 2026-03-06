algoritmo "Ex13"
var
   venda, total, maiorVenda, diaMaior, i: inteiro
inicio
   total <- 0
   maiorVenda <- -1

   para i de 1 ate 30 faca
      escreva("Venda do dia ", i, ": ")
      leia(venda)

      total <- total + venda

      se (venda < 5) entao
         escreval("ALERTA: Estoque baixo no dia ", i)
      fimse

      se (venda > maiorVenda) entao
         maiorVenda <- venda
         diaMaior <- i
      fimse
   fimpara

   escreval("Total vendido no mês: ", total)
   escreval("Maior venda: ", maiorVenda, " no dia ", diaMaior)
fimalgoritmo
