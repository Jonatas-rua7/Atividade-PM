algoritmo "Ex15"
var
   n, i, a, b, proximo, pares: inteiro
inicio
   escreva("Quantos termos da sequência? ")
   leia(n)

   a <- 0
   b <- 1
   pares <- 0

   para i de 1 ate n faca
      escreva(a, " ")

      se (a % 2 = 0) entao
         pares <- pares + 1
      fimse

      proximo <- a + b
      a <- b
      b <- proximo
   fimpara

   escreval("")
   escreval("Quantidade de termos pares: ", pares)
fimalgoritmo
