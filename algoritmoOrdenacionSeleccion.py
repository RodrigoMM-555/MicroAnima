
import random

lista = [1, 2, 3, 4, 5, 6, 7, 8, 9]



def algoritmo1(lista):

    listaOrdenada = []

    random.shuffle(lista)

    print(lista)

    for i in range(len(lista)):
        minimo = 100
        for num in lista:

            if num < minimo:
                minimo = num
        lista.remove(minimo)
        listaOrdenada.append(minimo)

    print(listaOrdenada)


def algoritmo2(lista):

    random.shuffle(lista)

    for i in range(len(lista)):
        minimo = 100
        print(lista)

        for num in lista[i:]:   #Esto es lo que hace que busque solo a partir de la i
            if num < minimo:
                minimo = num

        posMinimo = lista.index(minimo, i) #Y esto busca la posicion del minimo desde i

        cambio = lista[i]

        lista[posMinimo] = cambio
        lista[i] = minimo

    print(lista)


algoritmo2(lista)


        



