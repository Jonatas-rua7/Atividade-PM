algoritmo "ex17"
var
   usuario, senha : caractere
inicio
   escreva("Usuário: ")
   leia(usuario)
   escreva("Senha: ")
   leia(senha)
   se (usuario = "admin") e (senha = "1234") entao
      escreva("Acesso permitido")
   senao
      escreva("Acesso negado")
   fimse
fimalgoritmo
