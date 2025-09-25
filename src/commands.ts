import type { Command } from '@/class/command';

interface CommandModule {
  default: Command;
}

const commands: Command[] = [];
const importGlob = new Bun.Glob('./commands/**/*.ts');

for await (const path of importGlob.scan({ cwd: import.meta.dirname })) {
  const module = await import(path) as CommandModule;
  commands.push(module.default);
}

export default commands;
