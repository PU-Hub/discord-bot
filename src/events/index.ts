import type { EventHandler } from '@/class/event';

import onButton from '#/core/onButton';
import onCommand from '#/core/onCommand';
import onModalSubmit from '#/core/onModalSubmit';

import ready from '#/custom/ready';

import threadCreate from '#/custom/threadCreate';
import threadControl from './custom/threadControl';
import threadDelete from './custom/threadDelete';

export default [onButton, onCommand, onModalSubmit, ready, threadCreate, threadControl, threadDelete] as EventHandler[];
