<<<<<<< HEAD
import type { CapacitorConfig } from '@capacitor/cli';
=======

import { CapacitorConfig } from '@capacitor/cli';
>>>>>>> 6e9620d207ccaf35b22949b03221e89d22556997

const config: CapacitorConfig = {
  appId: 'rideshare.com.pk',
  appName: 'ridesharemobileapp',
<<<<<<< HEAD
  webDir: 'dist'
=======
  webDir: 'dist',
  server: {
    url: 'http://localhost:8080',
    cleartext: true
  },
  bundledWebRuntime: false
>>>>>>> 6e9620d207ccaf35b22949b03221e89d22556997
};

export default config;
