import * as migration_20260927_071441 from './20260927_071441';
import * as migration_20260927_160142 from './20260927_160142';

export const migrations = [
  {
    up: migration_20260927_071441.up,
    down: migration_20260927_071441.down,
    name: '20260927_071441',
  },
  {
    up: migration_20260927_160142.up,
    down: migration_20260927_160142.down,
    name: '20260927_160142'
  },
];
