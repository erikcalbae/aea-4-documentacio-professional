# Cercador de Pel·lícules — Vuetify 3 & OMDb API

> **AEA 4: Creació de Documentació Tècnica i Manual d'Usuari**  
> **Activitat 4:** Documentació Professional d'un Projecte  
> **Cicle:** Desenvolupament d'Aplicacions Multiplataforma (DAM 2)  
> **Mòdul:** Desenvolupament d'Interfícies  
> **Autor:** Erik Calvo Baeza (`erikcalbae`)

---

## 1. Descripció del Projecte

Aquest projecte consisteix en una aplicació web interactiva de **cerca i consulta de pel·lícules i sèries en temps real**, construïda amb **Vue 3**, **Vuetify** i **Vite**, que es connecta al servei extern de l'**API d'OMDb** (Open Movie Database).

L'objectiu principal del projecte és desenvolupar una interfície d'usuari moderna, accessible i intuïtiva, aplicant els **principis fonamentals de disseny visual C.R.A.P.** (*Contrast, Repetició, Alineació i Proximitat*) i estructurant el codi en **components reutilitzables** i serveis desacoblats (`communicationManager.js`).

L'usuari pot introduir qualsevol títol o paraula clau per obtenir instantàniament un catàleg de coincidències amb les seves caràtules, tipus (pel·lícula o sèrie) i any d'emissió, a més de poder obrir una finestra emergent (*modal dialog*) amb la fitxa tècnica completa i la sinopsi detallada.

---

##  2. Tecnologies Utilitzades

El projecte s'ha elaborat emprant les següents tecnologies i biblioteques:

- **[Vue 3](https://vuejs.org/)** (`^3.5.30`): Framework progressiu de JavaScript, utilitzant la **Composition API** amb la sintaxi `<script setup>` per a una reactivitat neta i modular.
- **[Vite](https://vitejs.dev/)** (`^8.0.0`): Eina de construcció (*bundler*) ultra ràpida per a entorns de desenvolupament moderns.
- **[Vuetify 3](https://vuetifyjs.com/)** (`^4.0.2`): Biblioteca de components UI basada en les especificacions de disseny de Google Material Design (`v-card`, `v-dialog`, `v-btn`, `v-text-field`, `v-chip`, etc.).
- **[Material Design Icons (@mdi/font)](https://pictogrammers.com/library/mdi/)** (`7.4.47`): Paquet d'icones vectorials per millorar la comunicació visual (lupa, recàrrega, pel·lícula, sèrie, alertes).
- **[OMDb API](https://www.omdbapi.com/)**: RESTful Web Service que proporciona informació cinematogràfica global en format JSON mitjançant peticions HTTP asíncrones (`fetch`).
- **[TypeScript / JavaScript (ES6+)](https://www.typescriptlang.org/)**: Tipat estàtic i funcions modernes per a una millor robustesa del codi.
- **[Sass & CSS3](https://sass-lang.com/)**: Preprocessador per a estils personalitzats i retocs visuals avançats.

---

##  3. Instruccions d'Instal·lació i Execució en Local

Per poder clonar, instal·lar i executar aquesta aplicació al teu ordinador de manera local, segueix aquests passos:

### Requisits Previs

Assegura't de tenir instal·lat al teu ordinador:
- **Node.js**: Versió `18.x` o superior (recomanat `Node 20+` o `24+`). Pots verificar-ho executant:
  ```bash
  node -v
  ```
- **npm** (gestor de paquets inclòs amb Node):
  ```bash
  npm -v
  ```
- **Git** per a clonar el repositori.

---

### Pas 1: Clonar el Repositori

Obre un terminal (PowerShell, Bash o CMD) i descarrega el projecte:

```bash
git clone https://github.com/erikcalbae/aea-4-documentacio-professional.git
cd aea-4-documentacio-professional
```

---

### Pas 2: Instal·lar les Dependències

Executa la comanda `npm install` per descarregar tots els paquets i llibreries necessàries definides al `package.json`:

```bash
npm install
```

---

### Pas 3: Executar el Servidor de Desenvolupament

Un cop instal·lades les dependències, arrenca el servidor local amb:

```bash
npm run dev
```

El terminal et mostrarà l'adreça local on s'està executant l'aplicació, habitualment:
```text
  VITE v8.x.x  ready in 350 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Obre el teu navegador web preferit (Chrome, Edge, Firefox) i accedeix a:
 **`http://localhost:3000`** *(o el port indicat al teu terminal)*.

---

### Pas 4: Construir per a Producció (Opcional)

Si vols generar la versió final compilada i optimitzada per desplegar en un servidor web:

```bash
npm run build
```
Els arxius llestos per a producció es crearan automàticament a la carpeta `dist/`.

---

##  4. Configuració de l'API (OMDb)

L'aplicació es comunica amb l'API d'OMDb a través d'un mòdul de servei aïllat a:
 `src/services/communicationManager.js`.

El servei utilitza una clau d'API (`API_KEY`) pròpia ja configurada. Si en algun moment vols utilitzar la teva pròpia clau gratuïta d'OMDb:
1. Obtingues la teva clau a [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx).
2. Obre l'arxiu `src/services/communicationManager.js`.
3. Modifica la constant `API_KEY`:
   ```javascript
   const API_KEY = 'la_teva_clau_aqui'
   ```

---

##  5. Descripció de l'Ús Bàsic de l'Aplicació

L'aplicació ha estat dissenyada per oferir una experiència neta, àgil i sense complicacions:

1. **Cerca de Títols:**
   - A la barra superior trobaràs el camp de text amb l'indicador *"Títol de la pel·lícula"*.
   - Introdueix el títol que vulguis cercar (ex: *Inception*, *The Matrix*, *Spider-Man*).
   - Prem el botó blau **Cercar** o prem la tecla **Enter** al teu teclat.

2. **Control d'Estats de la Interfície:**
   - **Estat Inicial:** Si encara no s'ha fet cap cerca, es mostra una pantalla de benvinguda indicant que s'introdueixi un títol.
   - **Estat de Càrrega (*Loading*):** Mentre es fa la petició a la base de dades, apareix una animació circular indicant que s'estan descarregant les dades.
   - **Sense Resultats:** Si el títol no existeix o no hi ha cap coincidència, es mostra un avís clar recomanant provar una altra paraula clau.
   - **Gestió d'Errors:** Si es prem "Cercar" amb el camp buit o falla la connexió a Internet, apareix una alerta vermella explicativa.

3. **Visualització del Catàleg (Targetes de Pel·lícules):**
   - Els resultats es mostren en una graella responsive mitjançant el component refactoritzat `FitxaPelicula.vue`.
   - Cada targeta conté el pòster original (amb alçada homogènia i imatge de substitució si no en té), el títol limitat a dues línies, l'any de publicació i un distintiu (*badge*) que diferencia pel·lícules de sèries.

4. **Finestra Modal de Detalls (+ Més Informació):**
   - Fent clic al botó **+ Més informació**, s'activa una finestra modal (`v-dialog`) que fa una segona petició a l'API per recuperar la informació estesa:
     - Sinopsi / Argument complet (*Plot full*).
     - Director/a.
     - Repartiment d'actors principals.
     - Gènere cinematogràfic i durada.
     - Valoració oficial d'IMDb (amb icona d'estrella daurada).
   - Per tancar la modal, fes clic al botó **Tancar** o prem fora del quadre de diàleg.

5. **Neteja i Reinici:**
   - Fent clic al botó **Netejar** o a la icona de la creu (✖) de la barra de text, l'aplicació es reinicia al seu estat inicial buidant la graella.

---

##  6. Principis de Disseny Aplicats (C.R.A.P.)

Seguint els requisits de disseny del mòdul de *Desenvolupament d'Interfícies*, s'han implementat estrictament els 4 pilars C.R.A.P.:

- **Contrast:** S'utilitzen colors primaris blaus (`#1976D2`) sobre fons neutres clars (`#F5F5F5`), xips visuals d'alt contrast per al tipus de contingut i botons clarament jerarquitzats.
- **Repetició:** Totes les targetes de pel·lícules tenen exactament la mateixa alçada (380px per al pòster), la mateixa tipografia Roboto i la mateixa disposició de botons a tota la graella.
- **Alineació:** Els botons d'acció estan fixats sempre a la part inferior mitjançant `mt-auto`, i els camps del formulari estan perfectament alineats en una graella de 12 columnes de Vuetify.
- **Proximitat:** Les dades d'una mateixa pel·lícula (any, tipus, títol) s'agrupen de manera compacta dins la mateixa targeta visual, separant clarament un element d'un altre.

---

##  7. Estructura de Carpetes del Projecte

```text
aea-4-documentacio-professional/
├── public/                     # Fitxers estàtics i favicons
├── src/
│   ├── assets/                 # Imatges i logotips del projecte
│   ├── components/             # Components modulars de Vue
│   │   ├── BuscadorPelis.vue   # Component principal de cerca i estats
│   │   └── FitxaPelicula.vue   # Component reutilitzable per a la targeta individual
│   ├── pages/                  # Vistes i pàgines de l'aplicació
│   │   └── index.vue           # Pàgina principal
│   ├── plugins/                # Configuració de Vuetify i llibreries
│   │   ├── index.ts
│   │   └── vuetify.ts
│   ├── services/               # Serveis de dades i connexions externes
│   │   └── communicationManager.js  # Trucades Fetch a l'API d'OMDb
│   ├── styles/                 # Estils globals (Sass i Tailwind)
│   ├── App.vue                 # Component arrel de l'aplicació
│   └── main.ts                 # Punt d'entrada de Vue 3
├── MANUAL_USUARI.pdf           #  Manual d'usuari per a l'usuari final (1 pàgina)
├── manual_usuari.html          # Codi font HTML/CSS del manual d'usuari
├── index.html                  # Plantilla HTML principal
├── package.json                # Dependències i scripts de comanda
├── vite.config.mts             # Configuració del compilador Vite
└── README.md                   #  Aquesta documentació tècnica
```

---

##  8. Manual d'Usuari

Com a part dels requisits de l'activitat, s'ha redactat una guia ràpida per a usuaris no tècnics en un document PDF de màxima claredat i exactament **1 pàgina**:

 **[Descarregar / Consultar MANUAL_USUARI.pdf](./MANUAL_USUARI.pdf)**

---

##  9. Autor i Dades Acadèmiques

- **Alumne:** Erik Calvo Baeza
- **GitHub:** [@erikcalbae](https://github.com/erikcalbae)
- **Cicle Formatiu:** Desenvolupament d'Aplicacions Multiplataforma (DAM) — 2n Curs
- **Mòdul:** Desenvolupament d'Interfícies
- **Activitat:** AEA 4 — Creació de Documentació Tècnica i Manual d'Usuari
- **Curs Acadèmic:** 2026 - 2027
