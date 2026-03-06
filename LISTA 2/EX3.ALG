algoritmo "Ex3"
var
   i, num, maiorP, menorN: inteiro
   primeiroN: logico

inicio
   maiorP <- 0
   menorN <- 0
   primeiroN <- verdadeiro

   para i de 1 ate 15 faca
      escreva("Digite o ", i, "º número: ")
      leia(num)

      se (num > 0) entao
         se (num > maiorP) entao
            maiorP <- num
         fimse
      senao
         se (num < 0) entao
            se (primeiroN) entao
               menorN <- num
               primeiroN <- falso
            senao
               se (num < menorN) entao
                  menorN <- num
               fimse
            fimse
         fimse
      fimse
   fimpara

   escreval("")
   se (maiorP > 0) entao
      escreval("Maior número positivo: ", maiorP)
   senao
      escreval("Nenhum número positivo foi digitado.")
   fimse

   se (primeiroN = falso) entao
      escreval("Menor número negativo: ", menorN)
   senao
      escreval("Nenhum número negativo foi digitado.")
   fimse
fimalgoritmo
