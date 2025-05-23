<template>
  <v-footer color="white" app class="pa-0">
    <v-container fluid>
      <v-row class="w-100" align="center">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <div class="text-body-2 font-italic text-grey-darken-3 mb-2">© 2035 by Maya Nelson.</div>
          <div class="text-body-2">
            Powered and secured by
            <a href="https://www.wix.com" target="_blank" rel="noopener" class="text-blue-darken-2">
              Wix
            </a>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end align-center" style="gap: 40px;">
          
          <div class="text-center">
            <div class="text-subtitle2 font-weight-medium mb-1">Call</div>
            <div class="text-body-2 text-grey-darken-3">123-456-7890</div>
          </div>

          <div class="text-center">
            <div class="text-subtitle2 font-weight-medium mb-1">Write</div>
            <div class="text-body-2">
              <a href="mailto:info@mysite.com" class="text-blue-darken-2">info@mysite.com</a>
            </div>
          </div>

          <div class="text-center">
            <div class="text-subtitle2 font-weight-medium mb-1">Follow</div>
            <div class="d-flex justify-center" style="gap: 2px;">
              <v-btn icon variant="text" href="https://www.linkedin.com/in/azime-tolumo%C4%9Flu/" target="_blank" rel="noopener">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </v-btn>
              <v-btn icon variant="text" href="https://github.com/TOLUMOGLU" target="_blank" rel="noopener">
                <font-awesome-icon :icon="['fab', 'github']" />
              </v-btn>
              <v-btn icon variant="text" href="https://medium.com/@tolumogluazime2" target="_blank" rel="noopener">
                <font-awesome-icon :icon="['fab', 'medium']" />
              </v-btn>
              <v-btn icon variant="text" href="mailto:info@mysite.com" target="_blank" rel="noopener">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </v-btn>
            </div>
          </div>

        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>
