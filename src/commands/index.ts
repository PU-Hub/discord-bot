import type { Command } from '@/class/command';

import ask from '$/ask';
import feedback from '$/feedback';
import food from '$/food';
import latex from './latex';
import ping from '$/ping';
import genminiTest from './gemini/genminiTest';

export default [ask, feedback, food, latex, ping, genminiTest] as Command[];
