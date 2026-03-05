algoritmo "ex20"
var
   peso, altura, imc : real
inicio
   escreva("Peso (kg): ")
   leia(peso)
   escreva("Altura (m): ")
   leia(altura)
   imc <- peso / (altura ^ 2)
   escreval("IMC: ", imc:2:2)
   se (imc < 18.5) entao
      escreva("Abaixo do peso")
   senao
      se (imc < 25) entao
         escreva("Peso normal")
      senao
         se (imc < 30) entao
            escreva("Sobrepeso")
         senao
            escreva("Obesidade")
         fimse
      fimse
   fimse
fimalgoritmo
