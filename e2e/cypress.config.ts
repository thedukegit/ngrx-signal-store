import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run ngrx-signal:serve:development',
        production: 'nx run ngrx-signal:serve:production',
      },
      ciWebServerCommand: 'nx run ngrx-signal:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
