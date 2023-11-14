
from browser import document
from browser import html, ajax, alert, confirm

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
        x.bind("click", apagaUsuario)
        novoItem <= x
        lista <= novoItem
    document['principal'] <= lista
    
def apagaUsuario(ev):
    if not confirm("Apagar usuário?"):
        return
    alert(ev.target.parent['value'])
    ajax.delete('/usuario/'+ev.target.parent['value'], oncomplete=checaApagou)

def checaApagou(req):
    if req.json['status']!='OK':
        alert("Erro de requisição DELETE")
        return
    alert("Usuário removido")
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


def executaIncluir(ev):
    janelaPrincipal = document['principal']
    janelaPrincipal.innerHTML = ""

    caixa = html.DIV(Class="w3-card-4")
    cabecaCaixa  = html.DIV("<h2>Novo usuário</h2>", Class="w3-container w3-teal")
    formulario = html.FORM(Class="w3-container")    
    
    entraNome = EntraTexto("Nome", "nome")
    entraCep = EntraTexto("CEP", "cep", acaoblur= buscaCep)
    endereco = EntraTexto("Logradouro",'logradouro',desabilitado=True)
    entraMail = EntraTexto("e-mail", "email")
    
    botaoSubmete = html.BUTTON("Submeter",Class="w3-button w3-teal")
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
    alert("submeteu")

def buscaCep(ev):
    print("busca CEP")


barraMenu = html.DIV(Class="w3-bar w3-light-grey")
opcaoSobre = html.A("Sobre", Class="w3-bar-item w3-button w3-right")
opcaoSobre.bind( "click", executaSobre );
dropdown = html.DIV(Class="w3-dropdown-hover")
botaoAcoes = html.BUTTON("Ações", Class="w3-button" )
dropdownConteudo = html.DIV(Class="w3-dropdown-content w3-bar-block w3-card-4")
opcaoListar = html.A("Listar", Class="w3-bar-item w3-button")
opcaoListar.bind("click", executaListar)
opcaoIncluir = html.A("Incluir", Class="w3-bar-item w3-button")
opcaoIncluir.bind("click", executaIncluir)

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





