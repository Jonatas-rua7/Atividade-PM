algoritmo "Ex5"
var
   i, num, fat: inteiro

inicio
   repita
      escreva("Digite um número inteiro positivo: ")
      leia(num)

      se (num < 0) entao
         escreval("Erro! O número deve ser positivo.")
      fimse
   ate (num >= 0)

   fat <- 1
   para i de 1 ate num faca
      fat <- fat * i
   fimpara

   escreval("O fatorial de ", num, " é: ", fat)
fimalgoritmo
