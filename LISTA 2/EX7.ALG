algoritmo "Ex7"
var
   i, num, limite, resultado: inteiro

inicio
   escreva("Digite o número da tabuada: ")
   leia(num)
   escreva("Digite o limite final: ")
   leia(limite)

   para i de 0 ate limite faca
      resultado <- num * i
      escreval(num, " x ", i, " = ", resultado)
   fimpara
fimalgoritmo
