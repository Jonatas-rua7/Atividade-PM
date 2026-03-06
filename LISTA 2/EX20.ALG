algoritmo "Ex20"
var
   saque, resto: inteiro
   n100, n50, n20, n10, n5, n2, n1: inteiro
inicio
   repita
      escreva("Valor do saque: ")
      leia(saque)
   ate saque > 0

   n100 <- saque \ 100
   resto <- saque % 100

   n50 <- resto \ 50
   resto <- resto % 50

   n20 <- resto \ 20
   resto <- resto % 20

   n10 <- resto \ 10
   resto <- resto % 10

   n5 <- resto \ 5
   resto <- resto % 5

   n2 <- resto \ 2
   n1 <- resto % 2

   escreval("Notas de 100: ", n100)
   escreval("Notas de 50: ", n50)
   escreval("Notas de 20: ", n20)
   escreval("Notas de 10: ", n10)
   escreval("Notas de 5: ", n5)
   escreval("Notas de 2: ", n2)
   escreval("Notas de 1: ", n1)
fimalgoritmo
