algoritmo "Ex4"
var
   i, num, c1, c2, c3: inteiro

inicio
   c1 <- 0
   c2 <- 0
   c3 <- 0

   para i de 1 ate 30 faca
      escreva("Digite o ", i, "º número: ")
      leia(num)

      se (num >= 0) e (num <= 25) entao
         c1 <- c1 + 1
      senao
         se (num >= 26) e (num <= 50) entao
            c2 <- c2 + 1
         senao
            se (num > 50) entao
               c3 <- c3 + 1
            fimse
         fimse
      fimse
   fimpara

   escreval("")
   escreval("Entre 0 e 25: ", c1)
   escreval("Entre 26 e 50: ", c2)
   escreval("Acima de 50: ", c3)

fimalgoritmo
