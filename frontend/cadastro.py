
from browser import document
from browser import html, ajax, alert, confirm

import json

class Alerta(html.DIV):
    def __init__(self, msg, tit="Atenção"):
        html.DIV.__init__(self, Class="w3-modal")
        self.modal = html.DIV(Class="w3-modal-content")
        self.modal <= html.DIV(Class="w3-container w3-blue-grey") <= html.P(tit)
        self.cont = html.DIV(Class="w3-container")
        fecha = html.SPAN("&times", Class="w3-button w3-display-topright")
        fecha.bind("click", self.dismiss)
        self.cont <= fecha
        self.mensagem = html.P(msg)                                          
        self.cont <= self.mensagem                                           
        self <= self.modal <= self.cont                                      
        document["areacd"].innerHTML=""                                      
        document["areacd"] <= self                                           
        self.style.display='block'                                           
    def setmsg  (self, msg):                                                 
        self.mensagem.innerHTML = msg                                        
    def dismiss(self,ev=0):                                                  
        self.style.display='none' 

class Confirma(Alerta):
    def __init__(self, msg, callback, titulo='Confirme'):
        Alerta.__init__(self, msg, titulo)
        self.callback = callback
        botaoConfirma = html.DIV("Sim", Class="w3-button")
        botaoConfirma.bind("click", self.confirma)
        botaoCancela = html.DIV("Não", Class="w3-button")                   
        botaoCancela.bind("click", self.dismiss)                            
        self.cont <= botaoConfirma                                          
        self.cont <= botaoCancela                                                                                                               
    def confirma(self, ev):                                                 
        self.style.display='none'                                           
        self.callback()  


def executaSobre(ev):
    ajax.get('/sobre', oncomplete=mostraSobre)

def mostraSobre(req):
    document['principal'].innerHTML = req.text

def executaListar(ev):
    ajax.get('/listar', mode="json", oncomplete=listaNomes)

def listaNomes(req):
    document['principal'].innerHTML = ""

    lista = html.UL(Class="w3-ul w3-card-4")
    if req.json['status']!='OK':
        alert("Erro de requisição GET")
        return
    for ele in req.json['resultado']:
        novoItem = html.LI(ele['nome'], Class="w3-display-container", value=ele['linha'])
        x = html.SPAN("&times;", Class="w3-button w3-transparent w3-display-right")
        x.bind("click", confirmaApagaUsuario)
        novoItem <= x
        lista <= novoItem
    document['principal'] <= lista

def confirmaApagaUsuario(ev):
    Confirma("Apagar usuário?", apagaUsuario)

def apagaUsuario(ev):
    ajax.delete('/usuario/'+ ev.target.parent['value'], oncomplete=checaApagou)

def checaApagou(req):
    if req.json['status']!='OK':
        alert("Erro de requisição DELETE")
        return
    Alerta("Usuário removido")

    executaListar("");

class EntraTexto(html.DIV):
    def __init__(self, rotulo, idInput, acaoblur=None, desabilitado=False):
        html.DIV.__init__(self, Class="w3-container")
        self <= html.LABEL( html.B(rotulo), Class="w3-text-teal" )
        entrada = html.INPUT(Class="w3-input w3-border w3-sand", id=idInput )
        if acaoblur:
            entrada.bind("blur",acaoblur )
        if desabilitado:
            entrada.disabled = True
        self <= entrada


def exibeFormIncluir(ev):
    janelaPrincipal = document['principal']
    janelaPrincipal.innerHTML = ""

    caixa = html.DIV(Class="w3-card-4")
    cabecaCaixa  = html.DIV("<h2>Novo usuário</h2>", Class="w3-container w3-teal")
    formulario = html.FORM(Class="w3-container")    
    
    entraNome = EntraTexto("Nome", "nome")
    entraCep = EntraTexto("CEP", "cep", acaoblur= buscaCep)
    endereco = EntraTexto("Logradouro",'logradouro',desabilitado=True)
    entraMail = EntraTexto("e-mail", "email")
    
    botaoSubmete = html.BUTTON("Submeter",Class="w3-padding-24	w3-button w3-teal")
    botaoSubmete.bind("click",submeteForm);

    formulario <= entraNome
    formulario <= entraCep
    formulario <= endereco
    formulario <= entraMail
    formulario <= botaoSubmete

    caixa <= cabecaCaixa
    caixa <= formulario 
    janelaPrincipal <= caixa

def submeteForm(ev):
    dados = {'nome': document['nome'].value,
        'cep': document['cep'].value,
        'email': document['email'].value
        }
    ajax.put("/", blocking=False, 
        headers={"Content-Type": "application/json; charset=utf-8"}, 
        timeout=None, 
        data=json.dumps(dados),
        oncomplete=usuarioIncluido)

def usuarioIncluido(res):
    Alerta("Usuário incluído")

def buscaCep(ev):
    cep  = document['cep'].value.replace("-","").replace(" ","")
    ajax.get('/cep/'+cep, mode="json", oncomplete=preencheLogradouro)
    print("busca CEP "+cep)

def preencheLogradouro(result):
    if result.json['status']!="OK":
        alert("CEP não encontrado.")
        return
    document['logradouro'].value = result.json['rua'] + " - " + result.json['cidade']



barraMenu = html.DIV(Class="w3-bar w3-light-grey")
opcaoSobre = html.A("Sobre", Class="w3-bar-item w3-button w3-right")
opcaoSobre.bind( "click", executaSobre );
dropdown = html.DIV(Class="w3-dropdown-hover")
botaoAcoes = html.BUTTON("Ações", Class="w3-button" )
dropdownConteudo = html.DIV(Class="w3-dropdown-content w3-bar-block w3-card-4")
opcaoListar = html.A("Listar", Class="w3-bar-item w3-button")
opcaoListar.bind("click", executaListar)
opcaoIncluir = html.A("Incluir", Class="w3-bar-item w3-button")
opcaoIncluir.bind("click", exibeFormIncluir)

dropdownConteudo <= opcaoListar
dropdownConteudo <= opcaoIncluir
dropdown <= botaoAcoes
dropdown <= dropdownConteudo
barraMenu <= dropdown
barraMenu <= opcaoSobre

document <= barraMenu

principal = html.DIV(id="principal", Class="w3-container")
areaCaixaDialogo = html.DIV(id="areacd")

document <= principal 
document <= areaCaixaDialogo





