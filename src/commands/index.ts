import type { Command } from '@/class/command';

import ask from '$/ask';
import feedback from '$/feedback';
import food from '$/food';
import ping from '$/ping';

export default [ask, feedback, food, ping] as Command[];
