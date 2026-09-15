
import random

lista = list(range(1, 10))
random.shuffle(lista)

print(lista)

for i in range(1, len(lista)):
    j = i

    while j > 0 and lista[j] < lista[j - 1]:
        lista[j - 1], lista[j] = lista[j], lista[j - 1]
        j -= 1
    print(lista)

