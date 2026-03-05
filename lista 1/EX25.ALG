algoritmo "ex25"
var
   i : inteiro
   num, maior, menor : real
inicio
   para i de 1 ate 10 faca
      escreva("Digite o ", i, "º número: ")
      leia(num)
      se (i = 1) entao
         maior <- num
         menor <- num
      senao
         se (num > maior) entao
            maior <- num
         fimse
         se (num < menor) entao
            menor <- num
         fimse
      fimse
   fimpara
   escreval("Maior valor: ", maior)
   escreval("Menor valor: ", menor)
fimalgoritmo
