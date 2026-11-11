<script setup>
import { ref } from 'vue'
import {
  buscarPelicules,
  obtenirDetallPelicula
} from '@/services/communicationManager'

const texto = ref('')
const peliculas = ref([])
const MesInfo = ref(null)

const dialogo = ref(false)
const haBuscado = ref(false)
const cargando = ref(false)
const error = ref('')

async function buscar() {
  if (!texto.value.trim()) {
    error.value = 'Escribe el título de una película'
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
    error.value = 'Se ha producido un error al buscar las películas'
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
      error.value = 'No se ha podido obtener la información'
    }
  } catch (e) {
    error.value = 'Se ha producido un error al obtener los detalles'
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
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        Buscador de pel·lícules
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <!-- Buscador -->
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="texto"
              label="Títol de la pel·lícula"
              placeholder="Exemple: Batman"
              variant="outlined"
              @keyup.enter="buscar"
            />

            <div class="d-flex ga-2">
              <v-btn
                color="primary"
                :loading="cargando"
                @click="buscar"
              >
                Cercar
              </v-btn>

              <v-btn
                variant="outlined"
                @click="limpiar"
              >
                Netejar
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Error -->
        <v-alert
          v-if="error"
          type="error"
          class="mb-6"
        >
          {{ error }}
        </v-alert>

        <!-- Todavía no se ha buscado -->
        <v-alert
          v-if="!haBuscado && !error"
          type="info"
          variant="tonal"
        >
          Escriu el títol d'una pel·lícula i prem «Cercar».
        </v-alert>

        <!-- Petición en curso -->
        <div
          v-if="cargando"
          class="text-center pa-8"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />

          <p class="mt-4">
            Cercant pel·lícules...
          </p>
        </div>

        <!-- No hay resultados -->
        <v-alert
          v-if="haBuscado && !cargando && !error && peliculas.length === 0"
          type="warning"
          variant="tonal"
        >
          No s'han trobat pel·lícules.
        </v-alert>

        <!-- Resultados -->
        <v-row v-if="!cargando && peliculas.length > 0">
          <v-col
            v-for="pelicula in peliculas"
            :key="pelicula.imdbID"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card height="100%">
              <v-img
                :src="
                  pelicula.Poster !== 'N/A'
                    ? pelicula.Poster
                    : 'https://placehold.co/300x450?text=Sense+poster'
                "
                height="420"
                cover
              />

              <v-card-title>
                {{ pelicula.Title }}
              </v-card-title>

              <v-card-subtitle>
                {{ pelicula.Year }} · {{ pelicula.Type }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="verMasInfo(pelicula.imdbID)"
                >
                  MÉS INFO
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Información detallada -->
    <v-dialog
      v-model="dialogo"
      max-width="800"
    >
      <v-card v-if="MesInfo">
        <v-card-title>
          {{ MesInfo.Title }}
        </v-card-title>

        <v-card-text>
          <p><strong>Director:</strong> {{ MesInfo.Director }}</p>
          <p><strong>Actors:</strong> {{ MesInfo.Actors }}</p>
          <p><strong>Argument:</strong> {{ MesInfo.Plot }}</p>
          <p><strong>Durada:</strong> {{ MesInfo.Runtime }}</p>
          <p><strong>Gènere:</strong> {{ MesInfo.Genre }}</p>
          <p><strong>Valoració IMDb:</strong> {{ MesInfo.imdbRating }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn @click="dialogo = false">
            Tancar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>