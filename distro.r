x = rpois(60, 10)#Autos que pasan por min
xMean = mean(x) #Promedio de autos por min
xMean
xMean = xMean/60 #Promedio por segundo
xMean
tabla = data.frame(cbind( x))
tabla
hist(x = x, main = "Concurrencia de autos", 
     xlab = "Autos", ylab = "Frecuencia",
     col = "ivory")

t= rexp(10000, xMean)#Se simula el mismo suceso n veces
t
hist(x = t, main = "Llegada a la cola", 
     xlab = "Autos", ylab = "Frecuencia",
     col = "ivory")
t  = mean(t) #Tiempo que tarda en llegar a la cola
t
vp = 60/t #número de autos en min
vp #Cantidad de autos que llegan en un min
#La velocidad estimada que se permite es de 30km/h
#Al momento del arranque, estan con una velocidad de 
#20km/h
#La distancia a recorrer es de aprox. 5m
#Se desea conocer el tiempo que tardan en recorrer esa distancia
#Unidad de distancia km
d = 0.008 #Distancia a recorrer
v = 20 #Velocidad de arranque
t = d/v #Tiempo a utilizar en cruzar la distancia
t
apm = 60/(t*3600)#Cantidad de autos máximo que puede pasar en un min
apm
#Probalidad de que pasen menos autos en un min
prob = ppois(50, apm, lower.tail = F)
prob