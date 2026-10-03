# Cabo Spa — qué necesito de ti, y qué no

Escrito el 3-oct-2026, después de revisar la página en vivo
(`caboinhomespa.privatechefloscabos.com`) y los datos de búsqueda de Semrush.

**Respuesta corta a «¿cómo te ayudo?»: para el código, nada.** El repositorio está en el
Escritorio, GitHub Pages publica solo al fusionar, y no necesito ninguna cuenta tuya para
trabajar aquí. Lo que no puedo hacer sin ti son **ocho decisiones y un dato**, todas de
las que no se pueden inventar.

---

## Lo que ya está hecho, para que no lo preguntes dos veces

| Cuándo | Qué |
| --- | --- |
| 1-oct | Pixel de Meta y medición de los clics que nunca se medían (#1) |
| 1-oct | Las 6 preguntas marcadas en JSON-LD no estaban en la página; ahora sí (#2) |
| 1-oct | La calificación 5,0 que la página declaraba y no mostraba, visible (#3) |
| 2-oct | Título y h1 apuntados a «massage cabo san lucas», que es donde está la demanda (#6) |
| 3-oct | Las dos fotos que iban a un cuarto de su resolución, a tamaño real (#7) |
| **3-oct** | **Los 19 tratamientos y sus precios pasan al HTML** (#8) — ver abajo |

El PR #4 lo cerré sin fusionar a propósito: era de 9-sep y, al estar hecho sobre una base
vieja, habría **revertido** el título del día anterior. Me llevé solo las dos fotos a una
rama nueva (#7).

### Por qué el #8 de hoy importa más de lo que parece

Los 19 tratamientos y lo que cuesta cada uno vivían **solo dentro del JavaScript**. El
navegador los mostraba; el HTML que sirve el servidor no tenía más que un hueco vacío y
la frase «Tap a category». 651 palabras visibles y **ni un precio**.

Googlebot ejecuta JavaScript, tarde y con menos peso. **Los rastreadores de ChatGPT y
compañía en general no lo ejecutan.** Y la caída del spa en septiembre (−68 %) fue
justamente la pérdida de sus sesiones de ChatGPT. Para esos lectores la página estaba
vacía. Ahora los 19 tratamientos, las 4 categorías y los 12 precios están en el texto,
generados desde `SPA_MENU` por `tools/menu-visible.mjs` — una sola fuente, nunca dos
copias.

**Consecuencia para ti:** los precios de `SPA_MENU` ahora son públicos de verdad. Si
alguno está viejo, está viejo en Google.

---

## Las ocho decisiones que necesito de ti

Puedes contestarlas en una sola vuelta, con una línea cada una.

### 1. Las 86 reseñas, atribuidas al spa (la más importante)

La página declara `aggregateRating` **5,0 con 86 reseñas** dentro de un nodo
`HealthAndBeautyBusiness` que representa **el spa**. Pero esas 86 son las reseñas de
Google de **Cabo Travel Boutique entera** — chef, transporte, todo.

No es una mentira: el nodo dice `parentOrganization`. Pero un rastreador lee «este spa
tiene 86 reseñas con 5,0», y eso el spa no lo ha ganado por sí mismo. Tres salidas:

- **Dejarlo** si varias de esas 86 hablan del masaje (dime cuántas, aunque sea de
  memoria).
- **Bajar el nodo a la organización madre** y que el spa no declare calificación.
- **Pedir reseñas de spa** a los clientes que ya lo usaron, y declararlas cuando existan.

Yo haría la segunda mientras llega la tercera. **Pero es tu decisión**, porque es tu
Perfil de Google.

### 2. ¿Están vigentes los 19 precios?

Ahora son texto público. Los que publica hoy la página:

| | 60 min | 90 min |
| --- | --- | --- |
| Sueco, descontracturante, deportivo, aromaterapia, personalizado, embarazo | $156 | $216 |
| Piedras calientes | $180 | $240 |
| Espalda/hombros/cuello (30 min) · Reflexología (30 min) | $96 | — |
| Facial de limpieza | $174 | — |
| Facial antiedad (90 min) | $228 | — |
| Exfoliación corporal (30 min) | $96 | — |
| Envoltura corporal | $168 | — |
| Manicura $66 · Pedicura $79 · Combo mani+pedi $144 | | |
| Los tres combos (masaje + exfoliación / espalda + exfoliación + facial / masaje + facial) | $228 cada uno | — |

Más 16 % de IVA, propina no incluida. **Si algo cambió, dímelo y lo muevo en un sitio:
se actualiza solo en los dos lados.**

### 3. ¿Hay mínimo de reserva?

Hoy la página no dice ninguno. Es decir: alguien puede pedir **una manicura de $66 en una
villa de Palmilla** y la página se lo acepta. ¿Hay mínimo en dinero, en tratamientos o en
tiempo? Si lo hay, hay que escribirlo antes de que alguien lo reserve.

### 4. Zonas: ¿qué pasa con East Cape y el Pacífico?

La página dice que sirve **San José del Cabo, el Corredor y Cabo San Lucas**. No menciona
East Cape, Diamante ni la zona del Pacífico. ¿Es que no van, o van con recargo? Las tres
respuestas son publicables; lo que no se puede es callarlo y que alguien lo descubra al
reservar.

### 5. Las terapeutas: «licensed» aparece cinco veces

La página dice «licensed, experienced therapists» en cinco sitios, incluida una pregunta
frecuente. Es la clase de afirmación que alguien puede pedirte que respaldes. **¿Tienes
las cédulas o certificados?** Si sí, no hay nada que cambiar. Si es más informal que eso,
lo reescribo a algo que sí puedas sostener («profesionales con experiencia», por
ejemplo) — y eso no debilita la página tanto como crees.

### 6. «Confirmación en 24 horas»

Lo dice la pregunta frecuente. ¿Es cierto en temporada alta? Si en la práctica son 2
horas, decirlo es mejor. Si a veces son 48, también.

### 7. Las fotos

Hay 6 imágenes. **La que más convertiría no está:** una foto real de una mesa de masaje
montada en una terraza o una habitación de villa, con el mar detrás. Eso es exactamente
lo que la gente está intentando imaginarse cuando decide, y no se puede sustituir con una
foto de catálogo. Si existe en el AMS o en tu teléfono, dime en qué carpeta y la monto.

### 8. ¿WhatsApp propio del spa?

Las reservas salen al WhatsApp general de CTB. Si hay un número o una persona que
atiende spa, conviene que el botón lleve ahí: cada salto cuesta reservas.

---

## El dato que necesito

**¿Cuántas reservas de spa entraron en septiembre, y cuántas llegaron por la página?**
Aunque sea aproximado. Lo pido por una razón concreta: la página está en **posición 7,2**
y eso parece bueno, pero es posición 7 en búsquedas que casi nadie hace. El mercado real
es otro:

| Búsqueda | Al mes | Dificultad |
| --- | --- | --- |
| **`massage cabo san lucas`** | **590** | 46 |
| `cabo massage` | 210 | 40 |
| `cabo san lucas spa` | 170 | 23 |
| `massage los cabos` | 170 | 39 |
| `spa cabo san lucas` | 110 | 30 |
| `best spa in cabo` | 110 | 31 |
| `mobile massage cabo san lucas` | 20 | 0 |
| `in home massage cabo`, `in villa massage cabo`, `villa massage los cabos`, `mobile spa los cabos`, `cabo massage prices`, `prenatal massage cabo` | **0** | — |

El título ya apunta a `massage cabo san lucas` desde el 2-oct. Dificultad 46 es duro: no
se gana con texto, se gana con **autoridad**, y autoridad quiere decir que otros sitios
te enlacen. Por eso los dos correos que te dejé escritos en
`~/Desktop/ctb-tarjetas/CORREOS-ENLACES.md` (The Cabo Sun y Los Cabos Guide) valen más
para el spa que cualquier otro cambio que yo pueda hacer en esta página.

Lo que sí tenemos a favor y casi nadie más: **publicamos los precios**. Después del #8 de
hoy están en el HTML, legibles por los motores de respuesta. Es la ventaja con la que hay
que pelear por esos 590.

---

## Lo que no hay que hacer

- **No reescribir el menú a mano.** `SPA_MENU` es la fuente; `tools/menu-visible.mjs`
  genera la mitad visible. Editar el HTML directamente crea dos copias que se separan.
  Igual que `tools/faq-visible.mjs` y `tools/rating-visible.mjs`.
- **No añadir `FAQPage` a más páginas por los rich results.** Google los retiró el
  **7-may-2026** para todos los sitios y borró hasta la documentación. El marcado que ya
  existe se queda (sigue leyéndose), pero no es un motivo para abrir trabajo nuevo.
- **No encoger el cuerpo a Cabo San Lucas.** El título apunta ahí porque ahí está la
  búsqueda, pero el servicio va a las tres zonas y el texto tiene que seguir diciéndolo.
