algoritmo "ex24"
var
   num, soma, cont : real
inicio
   soma <- 0
   cont <- 0
   escreva("Digite um número (0 para sair): ")
   leia(num)
   enquanto (num <> 0) faca
      soma <- soma + num
      cont <- cont + 1
      escreva("Digite outro número (0 para sair): ")
      leia(num)
   fimenquanto
   escreval("Quantidade de números digitados: ", cont)
   escreval("Soma total: ", soma)
fimalgoritmo
