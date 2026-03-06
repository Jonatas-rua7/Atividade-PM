algoritmo "Ex6"
var
   num, soma, cont: inteiro
   media: real

inicio
   soma <- 0
   cont <- 0

   escreva("Digite um número (negativo para parar): ")
   leia(num)

   enquanto (num >= 0) faca
      soma <- soma + num
      cont <- cont + 1
      escreva("Digite o próximo número: ")
      leia(num)
fimenquanto

   se (cont > 0) entao
      media <- soma / cont
      escreval("Soma dos positivos: ", soma)
      escreval("Média dos números: ", media:2:2)
   senao
      escreval("Nenhum número positivo foi digitado.")
   fimse
fimalgoritmo
