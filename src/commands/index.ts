import type { Command } from '@/class/command';

import feedback from '$/feedback';
import food from '$/food';
import ping from '$/ping';

export default [feedback, food, ping] as Command[];
