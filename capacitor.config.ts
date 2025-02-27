
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'rideshare.com.pk',
  appName: 'ridesharemobileapp',
  webDir: 'dist',
  server: {
    url: 'http://localhost:8080',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
