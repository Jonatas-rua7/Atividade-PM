   algoritmo "Ex2"
var
   i: inteiro
   nota, soma, media: real

inicio
   soma <- 0

   para i de 1 ate 5 faca
      repita
         escreva("Digite a ", i, "ª nota (0-10): ")
         leia(nota)

         se (nota < 0) ou (nota > 10) entao
            escreval("Nota inválida! Tente novamente.")
         fimse
      ate (nota >= 0) e (nota <= 10)

      soma <- soma + nota
   fimpara

   media <- soma / 5

   escreval("")
   escreval("A média final é: ", media:2:2)
fimalgoritmo
