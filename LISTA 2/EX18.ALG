algoritmo "Ex18"
var
   senha: texto
   tentativas: inteiro
inicio
   tentativas <- 0
   repita
      escreva("Digite a senha: ")
      leia(senha)
      tentativas <- tentativas + 1

      se (senha <> "1234") entao
         escreval("Senha incorreta!")
      fimse
   ate senha = "1234"

   escreval("Acesso concedido!")
   escreval("Total de tentativas: ", tentativas)
fimalgoritmo
