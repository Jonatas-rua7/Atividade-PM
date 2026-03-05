algoritmo "ex10"
var
   n1, n2 : real
inicio
   escreva("Digite o primeiro número: ")
   leia(n1)
   escreva("Digite o segundo número: ")
   leia(n2)
   se (n1 > n2) entao
      escreva("O maior é: ", n1)
   senao
      se (n2 > n1) entao
         escreva("O maior é: ", n2)
      senao
         escreva("Os números são iguais")
      fimse
   fimse
fimalgoritmo
