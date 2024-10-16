import type { Command } from '@/class/command';

import ask from '$/ask';
import feedback from '$/feedback';
import food from '$/food';
import latex from './latex';
import ping from '$/ping';

export default [ask, feedback, food, latex, ping] as Command[];
