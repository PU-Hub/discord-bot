import type { EventHandler } from '@/class/event';

interface EventHandlerModule {
  default: EventHandler;
}

const commands: EventHandler[] = [];
const importGlob = new Bun.Glob('./events/**/*.ts');

for await (const path of importGlob.scan({ cwd: import.meta.dirname })) {
  const module = await import(path) as EventHandlerModule;
  commands.push(module.default);
}

export default commands;
