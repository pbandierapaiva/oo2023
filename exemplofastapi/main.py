from typing import Union

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

app = FastAPI()

app.mount("/web", StaticFiles(directory="../frontend"), name="web")


@app.get("/")
def read_root():
    return RedirectResponse("/web/brythonfe.html")

@app.get("/sobre")
def sobre():
    return HTMLResponse(content="<h2>Exemplo de backend/frontend em ExpressJS</h2>", status_code=200)

@app.get("/listar")
def listar():

    retorno = { 'status':'ERRO', 'resultado' : []};
    arq = open("nomes.txt")
    
    n=0
    while True:
        linha = arq.readline()
        if linha=="":
            break
        campos = linha.strip().split("|")
        retorno['status'] ='OK'
        retorno['resultado'].append({'nome':campos[0],
                    'cep'   : campos[1],
                    'email' : campos[2],
                    'linha' : n
                    })
        n+=1
    return JSONResponse(content=jsonable_encoder(retorno))

@app.get("/listar/{uid}")
async def leItem(uid):
    retorno = { 'status':'ERRO'};
    arq = open("nomes.txt")
    n = int(uid)
    for i in range(n+1):
        linha = arq.readline()
        
    campos = linha.strip().split("|")
    retorno['status'] ='OK'
    retorno['resultado'] = {'nome':campos[0],
                    'cep'   : campos[1],
                    'email' : campos[2],
                    'linha' : uid
                    }
    return JSONResponse(content=jsonable_encoder(retorno))
    
@app.delete("/usuario/{uid}")
async def apaga(uid):
    arq = open("nomes.txt")
    n = int(uid)

    linhas = arq.readlines()
    del linhas[n]
    arq.close()
    arq = open("nomes.txt","w")
    arq.writelines(linhas)
    arq.close()


