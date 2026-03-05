algoritmo "ex16"
var
   a, b, c : real
inicio
   escreva("Digite o primeiro lado: ")
   leia(a)
   escreva("Digite o segundo lado: ")
   leia(b)
   escreva("Digite o terceiro lado: ")
   leia(c)
   se (a < b + c) e (b < a + c) e (c < a + b) entao
      escreva("Triângulo válido")
   senao
      escreva("Triângulo inválido")
   fimse
fimalgoritmo
