algoritmo "ex23"
var
   i : inteiro
   num, soma, media : real
inicio
   soma <- 0
   para i de 1 ate 5 faca
      escreva("Digite o ", i, "º número: ")
      leia(num)
      soma <- soma + num
   fimpara
   media <- soma / 5
   escreva("A média dos valores é: ", media)
fimalgoritmo
