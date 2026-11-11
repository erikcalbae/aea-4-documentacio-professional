<script setup>
/**
 * Component específic per a la fitxa / targeta de cada pel·lícula.
 * Aplica els principis C.R.A.P:
 * - Contrast: badges de colors, títol jerarquitzat i botó destacat.
 * - Repetició: alçada uniforme de pòsters i targetes a tota la graella.
 * - Alineació: text limitat a dues línies i botons sempre alineats al fons (mt-auto).
 * - Proximitat: metadades (any i tipus) agrupades lògicament amb el títol.
 */
defineProps({
  pelicula: {
    type: Object,
    required: true
  }
})

defineEmits(['mes-info'])
</script>

<template>
  <v-card
    class="fitxa-pelicula d-flex flex-column h-100 rounded-lg"
    elevation="2"
    hover
  >
    <!-- Imatge / Pòster amb alçada consistent -->
    <div class="position-relative">
      <v-img
        :src="
          pelicula.Poster !== 'N/A'
            ? pelicula.Poster
            : 'https://placehold.co/300x450?text=Sense+Pòster'
        "
        height="380"
        cover
        class="bg-grey-lighten-2 rounded-t-lg"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
      </v-img>

      <!-- Badge de Tipus sobre la imatge (Contrast i Proximitat) -->
      <v-chip
        size="small"
        color="surface"
        variant="elevated"
        class="position-absolute text-capitalize font-weight-medium"
        style="top: 10px; right: 10px; opacity: 0.95;"
      >
        <v-icon start size="14">
          {{ pelicula.Type === 'series' ? 'mdi-television-classic' : 'mdi-filmstrip' }}
        </v-icon>
        {{ pelicula.Type }}
      </v-chip>
    </div>

    <!-- Cos de la fitxa -->
    <v-card-item class="pb-1">
      <!-- Títol limitat a 2 línies per mantenir l'alineació uniforme -->
      <v-card-title class="titol-pelicula text-subtitle-1 font-weight-bold pa-0 mb-1" :title="pelicula.Title">
        {{ pelicula.Title }}
      </v-card-title>

      <!-- Metadades agrupades (Proximitat i Repetició) -->
      <div class="d-flex align-center ga-2 text-caption text-medium-emphasis">
        <v-icon size="14" color="primary">mdi-calendar</v-icon>
        <span>{{ pelicula.Year }}</span>
      </div>
    </v-card-item>

    <v-spacer />

    <!-- Accions: botó d'informació sempre alineat al final -->
    <v-card-actions class="pa-4 pt-2 mt-auto">
      <v-btn
        color="primary"
        variant="tonal"
        block
        prepend-icon="mdi-information-outline"
        class="font-weight-bold"
        @click="$emit('mes-info', pelicula.imdbID)"
      >
        Més detalls
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.fitxa-pelicula {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.fitxa-pelicula:hover {
  transform: translateY(-4px);
}

.titol-pelicula {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3em;
  min-height: 2.6em;
}
</style>
