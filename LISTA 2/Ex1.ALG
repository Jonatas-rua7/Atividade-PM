algoritmo "soma_pares_conta_impares"
var
   i, numero, somaPares, qtdImpares: inteiro

inicio
   somaPares <- 0
   qtdImpares <- 0

   para i de 1 ate 20 faca
      escreva("Digite o ", i, "º número: ")
      leia(numero)

      se (numero % 2 = 0) entao
         somaPares <- somaPares + numero
      senao
         qtdImpares <- qtdImpares + 1
      fimse
  fimpara

   escreval("")
   escreval("Soma dos números pares: ", somaPares)
   escreval("Quantidade de números ímpares: ", qtdImpares)

fimalgoritmo
