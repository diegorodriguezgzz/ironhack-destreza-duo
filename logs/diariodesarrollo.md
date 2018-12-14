# Diario de desarrollo

## Intro

Hoy, 1 de diciembre de 2018, inicio este diario de desarrollo en el que expondré
el camino que tomó mi proyecto desde su inicio a la fecha, y que espero seguir
actualizando con cada sesión de programación.

Para comenzar, resumiré qué ha pasado hasta ahora.

### Concepción del proyecto

Inicialmente, contemplé varias alternativas para desarrollar. Me interesaba mucho
hacer algo como Paperboy, el juego clásico de NES, o quizás un juego de carreras.

Quería que los jugadores sintieran un impulso por competir y la emoción que 
aparece cuando interactúas con un medio que inspira una sensación de urgencia.

La idea de hacer **Destreza** surgió tras conversar con mi compañero del bootcamp,
Ricardo Chavero (GH: @chaveroricardo), con quien me tocó hacer un pair programming
en la segunda semana. Debíamos programar una versión muy reducida de Clue, y él no
estaba completamente seguro de cuál era la dinámica del juego. Cuando le pregunté
cuáles juegos solía utilizar de pequeño, me comentó que le gustaba mucho **Destreza**.

**Destreza**... sonaba perfecto. No lo había jugado desde que tenía a lo mejor 4
años, en casa de mi abuela en Azcapotzalco. Recuerdo que era un juego muy, muy 
difícil, o al menos lo era para mí, que siempre he tenido mala motricidad fina,
al menos de acuerdo con mi madre y las insinuaciones de mis compañeros, quienes
suelen recordarme ante cada oportunidad lo horrible que es mi caligrafía.

Pues sí, podría hacer **Destreza**.

### Presentación del proyecto

Ya había masticado un poco el concepto antes de lanzarme a hacer la presentación.

Leí cuáles eran los entregables esperados en la *learning* del portal de Ironhack
y elaboré una estructura básica de presentación.

Quería hacer algo muy sencillo, que evocara a las emociones generadas por una 
partida de **Destreza** y lo intenté plasmar en una presentación en slides.com
que puedes consultar [aquí](https://slides.com/diegorodriguezgzz/deck#/).

Dado que **Destreza** es un juguete y se acerca la Navidad, aproveché para jugar
un poco con la temática de entrega de regalos a niños en esta temporada, lo cual
se refleja en las imágenes y texturas que usé. Además, traté de replicar lo mejor
posible los colores del juego en la presentación, como si los espectadores
acabaran de recibir el juego en una caja envuelta.

También a lo largo del desarrollo de la presentación, me aseguré de cumplir con
todos los requisitos del juego. Ironhack pedía específicamente que el juego fuera
de dos jugadores, o que tuviera una modalidad con dos jugadores, por lo que opté
por cambiar el concepto a **Destreza Duo**. Resultó ser un *match* natural: si
yo quiero cambiar un elemento en el juego, sólo debo de modificar unas líneas de
código, mientras que cuando los creadores de los juegos de mesa originales
querían recalibrar algún aspecto de la experiencia del usuario, debían de pensar
si era la decisión correcta o no, y arriesgarse con la producción física de miles
de cajas de plástico inyectado. *Código 1 – Plástico 0.*

Recibí buena retroalimentación de mi presentación, donde traté de usar un poco mi 
sentido ñoño del humor y la confianza incipiente que empezamos a compartir los
estudiantes del bootcamp.

Ante la aprobación de la audiencia y los instructores, decidí continuar con el
proyecto.

### Planeación del proyecto

Pese a que nos habían solicitado que le diéramos una pensada a cómo estructurar
el trabajo y resolver los problemas, no lo hice sino hasta la siguiente sesión,
el martes (*tachita*), aunque ya había reflexionado un poco al respecto.

Me armé una presentación rápida en LibreOffice Impress, en la que partí el
problema en componentes que me parecían lógicos, y aproveché que los instructores
todavía no estaban listos para revisar mi trabajo para armar una breve 
descripción de las estructuras de datos que utilizaría: objetos, arreglos, etc.

Tras exponer mi tabla de tiempos y obtener aprobación de nuestro instructor
Germán (GH: germfy), armé una planeación un poco más formal, con tiempos de 
entrega y demás, en Smartsheet.

Mi desarrollo fue primero lógica, después enriquecer y enfocarse en la 
experiencia del usuario, lo cual fue posible porque el juego original ya había
resuelto ese problema por mí. Sólo debí realizar un par de modificaciones para
que la experiencia de dos jugadores fuera novedosa y divertida.

Luego me puse a identificar las piezas del juego original, y solicité apoyo
externo de la diseñadora [María Teresa del Real](http://entintarte.com/info.html)
para trazar las piezas en SVG.

Esto me dio tiempo de comenzar a trabajar en la lógica del juego. 

### Desarrollo del proyecto

#### 27 de noviembre, 2018

##### Qué hice

- Planeación del proyecto
- Solicité a María Teresa del Real apoyo con el trazado de las piezas.
- Elaboré un catálogo de las piezas, fila por fila, con *object literals*
- Diseñé lo más básico de las clases que usaría
- Mis clases son **Piece, Board, Game, Player y Chron**
- Comencé con las funciones del prototipo de **Piece**

##### Con qué batallé y cómo lo solucioné

- Batallé un poco con GitHub, porque no había hecho un README.md

Se solucionó con un poco de gimnasia en la terminal.

##### Qué aprendí

Tuve muy buena suerte, y mi planeación y experiencia previa me ayudaron a 
evitar *bugs* y enfocarme en un desarrollo muy ágil de las clases.
Fue un buen día y prácticamente todo salió bien.

#### 28 de noviembre de 2018

##### Qué hice

- Hice una primera separación de mi JS en tres archivos diferentes
- Hice primeras pruebas con el buscador
- Continué trabajo en los métodos asociados a cada clase
- Incorporé acomodos aleatorios (*shuffle*) y muestreo para juegos chicos

##### Con qué batallé y cómo lo solucioné

- No me di cuenta que le envié un tablero diferente al mío a María Teresa

Las piezas eran las mismas, pero estaban en un orden diferente.
Tuve que hacer un reacomodo para mantener consistencia.

- En algunos momentos, con el *scope* de mis funciones

Usar **Game** como clase envolvente que contiene todo lo demás fue muy
útil, porque pude meter ahí todos los parámetros y las variables que son
"globales" para el juego sin mucho problema, y cuando fuera pertinente, pasar
**Game** como parámetro a los métodos de sus clases.
Como en Javascript los objetos se pasan por referencia y no por valor, esto me
facilitó mucho la modificación de las propiedades en **Game**.

##### Qué aprendí

En realidad Teresa me sorprendió y me entregó las piezas muy rápido; mi intención
original era comentar con ella, en persona, qué iba a necesitar y en ese momento
le iba a dar la imagen correcta. No fue un problema mayor, pero pudo haber sido
valioso cerciorarme con antelación de cuál versión de *Destreza* iba a clonar.

También estoy muy feliz de haber visto que el *shuffle* y el muestreo estaban
muy relacionados. Esta intuición me permitió acelerar el desarrollo, porque no
gasté tiempo viendo cómo implementar distribuciones aleatorias en Javascript, y
el shuffle que usamos (Fisher-Yates) ya lo había visto para uno de los ejercicios
previos en Ironhack, por lo que no batallé para implementarlo.

#### 29 de noviembre de 2018

##### Qué hice

- Terminar el desarrollo de los métodos básicos de mis clases
- Hacer muchas pruebas
- Una interfaz de texto en el DOM, muy básica
- Integrar un juego de prueba básico, con un intervalo "vivo"

##### Con qué batallé y cómo lo solucioné

- El intervalo no estaba funcionando adecuadamente

Don Stack Overflow tiene muchas soluciones, y consulté blogs de varios
programadores (a quienes daría crédito pero honestamente no recuerdo cuál era
el bueno). 
En realidad mi problema era un tema de alcances, que solucioné pasando al juego
como parámetro en el método de **Chron**. Fue muy confuso hacer ese *debugging*,
porque no era obvio para mí cómo probar los intervalos adecuadamente.
Después me apresuré demasiado en programar y no me di cuenta que había cambiado
la ubicación de mi intervalo, lo cual me causó más confusión. Afortunadamente,
fue la decisión correcta y funcionó de maravilla cuando apunté bien el método.

- Las pruebas eran muy difíciles de completar en la terminal

Precisamente por este problema me puse a hacer los primeros acomodos de elementos
en el DOM. Me parecía mucho más fácil ver todo al mismo tiempo en la pantalla
grande que probar línea por línea la manipulación de todos mis objetos en la
consola.
Primero sólo llené el DOM con texto en diferentes secciones, sobre todo para las
notificaciones que necesitaba para cerciorarme que todo iba bien con la lógica
de mi código.
Creo que en la versión original, no tenía un tablero en el DOM, sino sólo una
lista de piezas para verificar la aleatoriedad de su selección en juegos chicos.
De todas maneras la selección era complicada, incluso viendo la ubicación de 
cada pieza, por lo que reconfiguré *onclicks* en cada pieza y las reacomodé en
*divs* adentro de un contenedor con flex.

##### Qué aprendí

Resultó que *flexbox* es una herramienta natural para el desarrollo de un juego
como éste, y armar mis pruebas en el DOM con *flexbox* influyó la dirección del
desarrollo posterior.
En este momento, las pruebas en el DOM seguían siendo muy rudimentarias y yo era
incapaz de terminar el juego antes de que concluyera el intervalo.
Ya había pensado desde antes en la experiencia del usuario y cómo iba a presentar
el juego de una manera intuitiva, pero hacer estas pruebas me obligó a acelerar
el desarrollo de UX, precisamente para poder validar la lógica más rápido.
Resolví que el siguiente día cerraría la brecha un poco más.

#### 30 de noviembre de 2018

##### Qué hice

- Flexibilicé las pruebas en el DOM para que funcionaran para cualquier dimensión
- Agregué métodos *onkeydown* para rotar las piezas (*huge time saver*)
- Agregué el tablero completo en modo de texto dentro de *flexbox*
- Abrí una nueva branch en el proyecto (*svg-grid*) para insertar los polígonos
- Hice mucha "talacha" para partir el tablero de Teresa en 50 svgs independientes
- Al final del día, sí pude meter SVGs a mi código por medio de HTML y JS
- Los SVGs sólo los usé para el tablero, no las piezas sueltas
- También monté GitHub Pages, donde vergonzosamente sigue mi prueba fea a la fecha

##### Con qué batallé y cómo lo solucioné

- GIMP está orientado a raster así que no graba SVGs por sí solo

Descargué **Inkscape** para manipular los SVGs. Me ayudó mucho usar los *shortcuts*
del teclado.

- Al parecer, HTML no permite manipular como SVG un archivo SVG

Éste sí fue un problemota, por no utilizar términos altisonantes.
**¿Cómo es posible que casi en 2019 no puedas sólo leer un SVG con un atributo src?**
La verdad sí me enfurecí muchísimo, porque debí cargar los SVG con tags <img> y
luego convertirlas a SVG dentro del DOM, lo cual además me sembró nuevos
problemas a futuro porque introdujo asincronía (lo cual no fue inmediatamente
obvio para mí, pero bueno).
Para la conversión utilicé esta solución que encontré en Stack Overflow, que
(crema batida en el pastel) usa JQuery y (cereza en la crema batida) no se puede
usar desde Chrome por una política de seguridad del *browser*.
Para mi buena fortuna, mi TA y compadre José Carlos Correa (GH: Jossdz) me tuvo
algo de paciencia y comentó que podría tratar de circumvenirlo con un servidor.
Dicho y hecho, el buen *live-server* que descargué de npm salvó el día y me
dejó hacer las conversiones a SVG. Luego me ayudó a montar mi GitHub Pages para
verificar que también funcionara ahí (*check*) y listo.

- Una vez cargados los SVG, no le podía dar estilo a los polígonos

AAARRRGGGHHH, *¿cómo que después de haber dado tanto por tener SVGs no los puedo*
*colorear? ¡Que alguien me explique!* Fastidiado por la ingratitud de mis
archivitos, me metí a ver la fuente (los SVGs son un subconjunto de XML) y para
mi buena fortuna, hacía perfecto sentido.
Mi bronca era que los polígonos redondeados (path) sí tenían relleno, pero no los
puntiagudos (polygon), ni círculos (circle) ni rectángulos (rect).
Originalmente pensaba que era un problema de que los polígonos no estaban
cerrados, pero era un tema de la forma en la que se invocan los métodos para
dibujar las curvas... algo que no era obvio para mí por mi nula experiencia como
diseñador y la falta de Adobe Illustrator en mis equipos de toda la vida.
Una vez que me zambullí a la fuente, todo fue claro, y me acerqué un paso más a
ascender a mi forma pura de energía y código.

##### Qué aprendí

Dios mío, que es bueno tener a gente paciente que te escucha y no te juzga por
cometer errores. Toda la razón por la cual quería usar SVGs es porque tenía la
idea de que podría hacer muchas cosas interesantes con transiciones y
transformaciones dentro de HTML/CSS, sin tener que batallar de más, pero en
realidad me trajo más dolores de cabeza. Mi intuición me traicionó.

A lo mejor debí de haber hecho una revisión mucho más exhaustiva de las
alternativas, incluso si me hubiera tenido que pasar horas trazando cada figura
en *HTML Canvas*. No, espera, me retracto, prefiero la solución lista que la 
"talachuda".

También me alegré de haber tenido más experiencia con selectores CSS, que en gran
medida conocía por mis travesuras de *webscraping* con R. Lo de los polígonos fue
muy fácil en gran parte por mi disposición previa a meterme a ver código fuente
de cosas que no fueron hechas por mí.

#### 1 de diciembre de 2018

##### Qué hice

- Extender el uso de SVGs en mi código
- Colorear mejor mis SVGs
- Mejorar el layout de mi tablero en el DOM
- Meter las piezas en lugar de los nodos de texto que tenía
- Comencé esta bitácora

##### Con qué batallé y cómo lo solucioné

- Para este momento, mi código ya era muy largo y confuso

Changos, yo que soy bien obsesivo con la concisión y legibilidad (y para lo que
francamente batallo mucho) no quedé nada contento con esto. Además, cuando quería
explicar mis problemas a Germán, pues no era tan fácil navegar a donde quería.

Esto todavía no lo resuelvo, pero sí tengo un montón de *refactoring* en mi lista
de cosas por hacer.

- La asincronía introducida al convertir img -> svg mató mis *onclicks*

Uf, por si no fuera evidente todavía que detesto la forma en la que HTML manipula
los SVGs, esto sí me sacó de mis casillas y me dejó muy frustrado, frente a mis
compañeros, por un período de unas 2 horas y media, amenizada por el *background*
*noise* del discurso de inauguración del presidente López Obrador.

Dado que mi **Destreza** debe funcionar para tableros de 3X3, 4X4 y 5X5, la 
construcción del DOM y el llenado de las imágenes debe ser flexible, o en otras
palabras, insertado por JS. O-kay, sin problema.

Lo malo es que como JS suele correrse de forma asíncrona en los buscadores, la
conversión de las tags img a svg—que tarda tantito—no termina antes que el resto
de mi código.

Esto significa que el *loop* que había armado para montar *onclicks* en cada uno 
de los huecos del tablero los aplicaba a las tags *img* y no a los *svg*... y por
ende, los *svg* no respondían a nada. Changos.

Germán me recomendó probar cargar las imágenes desde JS como objetos en lugar de
insertarlos al HTML con tags. Eso permitiría que las imágenes se cargaran antes y
no tendría problemas para montar los *onclick* después. Sin embargo, la bronca no
era con *img*, sino con la conversión a *svg*, y cuando implemente la sugerencia
de Germán, en realidad me quedé donde mismo. Mmmmm, ¿qué hacer?.

En mi frustración, me puse a probar desde consola el método, *en caliente*, y vi
que sí funcionaba, estaba bien programado, pero la asincronía lo mataba. ¿Qué tal
un *setTimeout*? No, la solución hubiera sido poco elegante y además ni funcionó.

Entonces me dije a mí mismo: de todas maneras no van a hacer clic sobre el hueco
en el tablero si no tienen pieza, así que mejor programo los *onclick* para que
se monten una vez que se seleccione la primera pieza y **¡BINGO!** se pudo.

Ahora el problema volvió a un asunto de huevo y la gallina, porque cuando metiera
las piezas sueltas como SVGs, pues... sería lo mismo, ¿no? Tendría que colocar
los *onclicks* una vez que ya se hubieran convertido a SVG y no automáticamente.
Y como además no sabría cuáles piezas meter desde antes de que el usuario 
seleccionara qué tipo de juego quería jugar, pues tenía que hacer algo nuevo.

Mi solución provisional fue colocar un botón de *start* y sólo colocar los
*onclick* cuando el usuario picara ahí. Lo que voy a hacer en la versión final, 
donde ya tendré menus de navegación y demás, es cargar los *img* y convertirlos a
*svg* desde el momento en el que se sabe cuáles son, con display: hide y sólo
mostrarlos cuando el usuario dé "start game". Ni modo, en lo que aprendo más de
JS, ésta tendrá que ser la solución.

- Las piezas que aparecían en el tablero no eran las que quería

y problema relacionado...

- Cuando quería eliminar piezas, se reacomodaban de formas inesperadas

Ok, esto era un problema de lógica, y lo resolví utilizando navegación de objetos
y montón de métodos de arreglos como *map y filter*. Todo ese tiempo haciendo
*katas* en **Codewars** valió la pena.

- Cuando resolví lo anterior, todo se cargaba como imgs de nuevo...

A veces la solución más sencilla es la mejor. Literalmente lo único que tuve
que hacer fue agarrar el *parentnode* de los svgs que quería eliminar y convertir
su *outerHTML* en "". Esto funcionó de maravilla, y no tuve que volver a cargar
nada ni volver a meter onclicks a objetos redibujados.

##### Qué aprendí

Antes que nada, estoy muy feliz de haber optado por hacer un nuevo branch para
probar todo esto, porque probablemente me hubiera arrancado el cabello de estrés
con la presión de hacer algo que rompiera mi código.

También me ayudó mucho modularizar todo y tener mucho cuidado con los inputs y 
outputs de mis métodos y funciones. No fue idóneo, pero creo que sí ahorré unas
10 horas de trabajo por haber utilizado buenas prácticas desde antes.

Finalmente, creo que la simplicidad suele ofrecer mejores soluciones... y código
más legible. Así que dedicaré un rato durante esta semana a hacer refactoring, en
lo que mis voluntarios me ayudan a hacer pruebas con la primera versión del 
juego.

La urgencia de tener claridad de mi proceso de desarrollo y las lecciones
aprendidas también me llevó a armar este documento, y aprender algo de Markdown.
Fue una buena primera semana de desarrollo, y hay que seguir *chambeando*.

#### 2 de diciembre de 2018

##### Qué hice
- Reducir un poco el código
- Incorporar rotación a las piezas
- Intentar que las rotaciones lleven animación
- Meter algunos sonidos
- *Merge* svg-grid con master

##### Con qué batallé y cómo lo solucioné
- Las animaciones no me salieron

Todavía no soluciono esto, pero espero hacerlo con el apoyo de mis compañeras que
sí son diseñadoras.

##### Qué aprendí
Ya me siento más tranquilo que ayer, y creo que hay mucho progreso.

#### 3 de diciembre de 2018

##### Qué hice
- Realizar pruebas con terceros
- Documentar sus observaciones

##### Con qué batallé y cómo lo solucioné

- Las animaciones no me salieron

Todavía no soluciono esto, pero espero hacerlo con el apoyo de mis compañeras que
sí son diseñadoras.

##### Qué aprendí

Ya me siento más tranquilo que ayer, y creo que hay mucho progreso.

#### 4 de diciembre de 2018

##### Qué hice
- Tomé un descanso

##### Con qué batallé y cómo lo solucioné

- No trabajar

Sí me preocupa un poco no resumir a tiempo esto. Procuraré evitarlo trabajando
mañana. Motivo de la demora: trabajar en *katas* en clase.

##### Qué aprendí

¿No procrastinar?

#### 5 de diciembre de 2018

#### 6 de diciembre de 2018

#### 10 de diciembre de 2018

##### Qué hice
- Traté de resolver un bug de posicionamiento

- Validé varias de las funciones de los *listeners* que había montado

- Exploré la posibilidad de animar las piezas para que se reubicaran si el usuario pierde

##### Con qué batallé y cómo lo solucioné

- La animación no estuvo tan sencilla

Esto lo atribuyo a decisiones que había tomado previamente y supuestos embebidos
en mi código. El proceso que intenté seguir se desmenuzó en:

  - Primero, quitar el estilo de "slot--full" del tablero

  - Segundo, colocar las piezas faltantes sobre los slots con position:absolute

  - Tercero, mandar a volar todas las piezas **SOBRE EL TABLERO**

Para ello, debí hacer algo de *refactoring*, tal como cambiar la manera en la
que estaba "borrando" las piezas usadas (antes borraba outerHTML, y después sólo
puse display:hide, pero igual no estuvo tan sencillo).

Igual, no pude completar la tarea y opté por volver a arrojarme contra los
molinos de viento en otra ocasión.

##### Qué aprendí

#### 11 de diciembre de 2018

Me tomé el día. Fui a ver *Die Fledermaus*, de Strauss, en Bellas Artes. *Worth it*, me reí mucho.

#### 12 de diciembre de 2018

##### Qué hice
- Resolví un bug de posiciones de piezas que llevaba arrastrando desde hace semanas

##### Con qué batallé y cómo lo solucioné

- Las herramientas de *debugging* tienen soporte limitado para errores de lógica

Incluso pensé que el error estaba en el momento en el que yo hacía un "highlight"
de las piezas, porque siempre era ahí cuando yo observaba el error.

En realidad, mi problema era que pese a que los arreglos de piezas se refrescaban
con cada reinicio de juego (y con ello sus posiciones), yo no estaba actualizando
las imágenes para que también rotaran con cada inicio de juego. Como resultado,
era posible que tuviera piezas mal rotadas y sólo se "actualizaran" sus clases
cuando les hiciera click.

Mi solución fue cambiar la forma en la que tenía escritos mis *scripts*
auxiliares y pasarlos más a un paradigma de "funciones" que de "variables 
globales", lo cual también considero que es buena práctica.

Funcionó de maravilla... y lo mejor fue darme cuenta de que resolví un problema
que había detectado desde hace mucho tiempo, pero que nada más no había tenido
la capacidad de entender hasta hoy.

##### Qué aprendí


Créditos y agradecimientos:
Aline Aragón (Apoyo moral)
Sandra Barrón (Asesoría UX)
Ricardo Chavero (Concepto)
José Carlos Correa ()
María Teresa del Real (SVGs de piezas)
Germán Domínguez (Asesoría HTML/CSS/JS)
Paulina Espinosa (Asesoría UX)