# Classes para tratar geometria 2d

class Ponto:
    def __init__(self, parX=0, parY=0):
        self.setXY( parX, parY)     
    def setXY(self, pX, pY):
        if type(pX) != int or type(pY) != int:
            raise TypeError("Somente aceita coordenadas inteiras")
        self.__x = pX
        self.__y = pY
    def getXY(self):
        return (self.__x,self.__y)
    def getX(self):
        return (self.__x)
    def getY(self):
        return (self.__y)   
    def __repr__(self):
        return "Instância de Ponto em (%d,%d) "%(self.__x,self.__y)
    def __str__(self):
        return "(%d,%d) "%(self.__x,self.__y)

class Poligono(list):
    def __init__(self, pontos=[]):
        list.__init__(self)
        for p in pontos:
            if type(p)!=Ponto:
                self.clear()
                raise TypeError("A lista que define um polígono só pode conter pontos")
            self.append(p)
    def move(self, origem=Ponto(0,0)):
        if type(origem)!=Ponto:
            raise TypeError("Você deve escolher um Ponto como nova origem")
        dX = origem.getX() - self[0].getX()
        dY = origem.getY() - self[0].getY()
        for p in self:
            p.setXY( p.getX()+dX, p.getY()+dY )

class Retangulo(Poligono):
    def __init__(self, larg=1, alt=1, origem=Ponto(0,0) ):
        if type(origem)!=Ponto or type(alt)!=int or type(larg)!=int:
            print(larg,alt,origem)
            raise TypeError("Retângulos devem ter altura e largura inteiros e origem em um  Ponto")
        Poligono.__init__(self, [origem,
                                 Ponto(origem.getX()+larg,origem.getY()),
                                 Ponto(origem.getX()+larg,origem.getY()+alt),
                                 Ponto(origem.getX(),origem.getY()+alt)
                                ])
class Quadrado(Retangulo):
    def __init__(self, lado=1, origem=Ponto(0,0) ):
        Retangulo.__init__(self, lado, lado, origem)