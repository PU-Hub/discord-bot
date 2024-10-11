# TypeScript Discord Bot

## Setup

Install dependencies with package manager

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

## Building a Slash Command

You can build a Slash Command with `Command` utility class:

```ts
export default new Command({
  builder: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll dice"),
  defer: false,
  ephemeral: true,
  async execute(interaction) {
    await interaction.reply({
      content: `🎲 ${Math.round(Math.random() * 6)}`,
    });
  },
});
```
