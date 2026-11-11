<script setup>
import { ref } from 'vue'
import {
  buscarPelicules,
  obtenirDetallPelicula
} from '@/services/communicationManager'
import FitxaPelicula from './FitxaPelicula.vue'

const texto = ref('')
const peliculas = ref([])
const MesInfo = ref(null)

const dialogo = ref(false)
const haBuscado = ref(false)
const cargando = ref(false)
const error = ref('')

async function buscar() {
  if (!texto.value.trim()) {
    error.value = 'Si us plau, escriu el títol d\'una pel·lícula per cercar.'
    return
  }

  haBuscado.value = true
  cargando.value = true
  error.value = ''
  peliculas.value = []

  try {
    const datos = await buscarPelicules(texto.value)

    if (datos.Response === 'True') {
      peliculas.value = datos.Search
    } else {
      peliculas.value = []
    }
  } catch (e) {
    error.value = 'S\'ha produït un error en connectar amb el servei de cerca.'
  } finally {
    cargando.value = false
  }
}

async function verMasInfo(imdbID) {
  try {
    const datos = await obtenirDetallPelicula(imdbID)

    if (datos.Response === 'True') {
      MesInfo.value = datos
      dialogo.value = true
    } else {
      error.value = 'No s\'ha pogut obtenir la informació de la pel·lícula.'
    }
  } catch (e) {
    error.value = 'S\'ha produït un error en carregar els detalls.'
  }
}

function limpiar() {
  texto.value = ''
  peliculas.value = []
  MesInfo.value = null
  dialogo.value = false
  haBuscado.value = false
  cargando.value = false
  error.value = ''
}
</script>

<template>
  <v-app class="bg-grey-lighten-4">
    <!-- Barra superior amb millor contrast i identitat visual -->
    <v-app-bar color="primary" elevation="2">
      <v-container class="d-flex align-center pa-0">
        <v-icon icon="mdi-movie-open-play" class="mr-3" size="28" />
        <v-app-bar-title class="font-weight-bold">
          Cercador de Pel·lícules
        </v-app-bar-title>
        <v-spacer />
        <v-chip v-if="peliculas.length > 0" color="white" variant="tonal" size="small">
          {{ peliculas.length }} resultats
        </v-chip>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" style="max-width: 1200px;">
        <!-- Secció de Cerca (Alineació i Proximitat millorades) -->
        <v-card class="pa-6 mb-8 rounded-xl elevation-2 bg-surface">
          <v-row align="center">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="texto"
                label="Títol de la pel·lícula"
                placeholder="Exemple: Inception, Batman, Matrix..."
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-magnify"
                clearable
                hide-details
                @keyup.enter="buscar"
                @click:clear="limpiar"
              />
            </v-col>

            <!-- Botons alineats i amb jerarquia de contrast clara -->
            <v-col cols="12" md="4" class="d-flex ga-3">
              <v-btn
                color="primary"
                size="large"
                class="flex-grow-1 font-weight-bold"
                prepend-icon="mdi-magnify"
                :loading="cargando"
                @click="buscar"
              >
                Cercar
              </v-btn>

              <v-btn
                variant="tonal"
                size="large"
                prepend-icon="mdi-refresh"
                @click="limpiar"
              >
                Netejar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Missatges d'estat i avisos -->
        <v-fade-transition>
          <div v-if="error" class="mb-6">
            <v-alert
              type="error"
              variant="tonal"
              border="start"
              closable
              icon="mdi-alert-circle"
            >
              {{ error }}
            </v-alert>
          </div>
        </v-fade-transition>

        <!-- Estat inicial: convida a cercar -->
        <div v-if="!haBuscado && !error" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-filmstrip-box-multiple</v-icon>
          <h3 class="text-h6 text-grey-darken-1 mb-2">Comença la teva cerca</h3>
          <p class="text-body-2 text-medium-emphasis">
            Introdueix el títol d'una pel·lícula o sèrie al camp superior per consultar el catàleg.
          </p>
        </div>

        <!-- Estat de Càrrega (Loading) -->
        <div v-if="cargando" class="text-center py-16">
          <v-progress-circular indeterminate color="primary" size="64" width="5" />
          <p class="mt-4 text-subtitle-1 text-medium-emphasis font-weight-medium">
            Cercant títols a la base de dades...
          </p>
        </div>

        <!-- Sense resultats -->
        <div v-if="haBuscado && !cargando && !error && peliculas.length === 0" class="text-center py-12">
          <v-icon size="64" color="warning" class="mb-3">mdi-movie-search-outline</v-icon>
          <h3 class="text-h6 mb-2">No s'ha trobat cap coincidència</h3>
          <p class="text-body-2 text-medium-emphasis">
            Prova amb una altra paraula clau o revisa si el títol està ben escrit.
          </p>
        </div>

        <!-- Graella de resultats mitjançant el nou component FitxaPelicula -->
        <v-row v-if="!cargando && peliculas.length > 0">
          <v-col
            v-for="pelicula in peliculas"
            :key="pelicula.imdbID"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <!-- Component específic refactoritzat -->
            <FitxaPelicula
              :pelicula="pelicula"
              @mes-info="verMasInfo"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Diàleg modal de Detalls refactoritzat (Contrast i Proximitat) -->
    <v-dialog v-model="dialogo" max-width="750" transition="dialog-bottom-transition">
      <v-card v-if="MesInfo" class="rounded-xl overflow-hidden">
        <v-card-item class="bg-primary text-white py-4">
          <div class="d-flex justify-space-between align-center">
            <div>
              <v-card-title class="text-h6 font-weight-bold text-white pa-0">
                {{ MesInfo.Title }}
              </v-card-title>
              <v-card-subtitle class="text-grey-lighten-3 pa-0 mt-1">
                {{ MesInfo.Year }} · {{ MesInfo.Runtime }} · {{ MesInfo.Rated }}
              </v-card-subtitle>
            </div>
            <v-btn icon="mdi-close" variant="text" color="white" density="comfortable" @click="dialogo = false" />
          </div>
        </v-card-item>

        <v-card-text class="pa-6">
          <v-row>
            <!-- Pòster a l'esquerra -->
            <v-col cols="12" sm="5">
              <v-img
                :src="MesInfo.Poster !== 'N/A' ? MesInfo.Poster : 'https://placehold.co/300x450?text=Sense+Pòster'"
                height="340"
                cover
                class="rounded-lg elevation-3"
              />
            </v-col>

            <!-- Informació estructurada a la dreta -->
            <v-col cols="12" sm="7" class="d-flex flex-column justify-space-between">
              <div>
                <!-- Puntuació IMDb i Gènere -->
                <div class="d-flex align-center flex-wrap ga-2 mb-4">
                  <v-chip color="amber-darken-3" prepend-icon="mdi-star" class="font-weight-bold" size="small">
                    {{ MesInfo.imdbRating }} / 10
                  </v-chip>
                  <v-chip color="primary" variant="outlined" size="small">
                    {{ MesInfo.Genre }}
                  </v-chip>
                </div>

                <!-- Sinopsi / Argument -->
                <div class="mb-4">
                  <div class="text-caption text-medium-emphasis font-weight-bold text-uppercase">Sinopsi</div>
                  <p class="text-body-2 mt-1" style="line-height: 1.5;">
                    {{ MesInfo.Plot }}
                  </p>
                </div>

                <v-divider class="my-3" />

                <!-- Fitxa tècnica -->
                <div class="text-body-2">
                  <p class="mb-1"><strong>Director:</strong> {{ MesInfo.Director }}</p>
                  <p class="mb-1"><strong>Actors:</strong> {{ MesInfo.Actors }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4 bg-grey-lighten-4">
          <v-spacer />
          <v-btn color="primary" variant="elevated" class="px-6" @click="dialogo = false">
            Tancar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
