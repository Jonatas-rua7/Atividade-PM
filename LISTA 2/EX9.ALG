algoritmo "Ex9"
var
   num, i, cont: inteiro
inicio
   repita
      escreva("Digite um número maior que 1: ")
      leia(num)
   ate num > 1

   cont <- 0
   para i de 1 ate num faca
      se (num % i = 0) entao
         cont <- cont + 1
      fimse
   fimpara

   se (cont = 2) entao
      escreval(num, " é um número primo.")
   senao
      escreval(num, " não é um número primo.")
   fimse
fimalgoritmo
