import type {
  AnySelectMenuInteraction,
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  Awaitable,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from 'discord.js';
import type { SharedSlashCommand } from '@discordjs/builders';
import type { ExtendedClient } from '@/class/client';

interface CommandHandlers {
  execute: (
    this: ExtendedClient,
    interaction: ChatInputCommandInteraction<'cached'>
  ) => Awaitable<void>;
  onAutocomplete?: (
    this: ExtendedClient,
    interaction: AutocompleteInteraction<'cached'>
  ) => Awaitable<readonly ApplicationCommandOptionChoiceData[]>;
  onButton?: (
    this: ExtendedClient,
    interaction: ButtonInteraction<'cached'>,
    buttonId: string
  ) => Awaitable<void>;
  onModalSubmit?: (
    this: ExtendedClient,
    interaction: ModalSubmitInteraction<'cached'>,
    modalId: string
  ) => Awaitable<void>;
  onSelectMenu?: (
    this: ExtendedClient,
    interaction: AnySelectMenuInteraction<'cached'>,
    menuId: string
  ) => Awaitable<void>;
}

export interface CommandOptions extends CommandHandlers {
  builder: SharedSlashCommand;
}

export class Command {
  builder: SharedSlashCommand;
  execute: (
    this: ExtendedClient,
    interaction: ChatInputCommandInteraction<'cached'>
  ) => Awaitable<void>;

  onAutocomplete?: (
    this: ExtendedClient,
    interaction: AutocompleteInteraction<'cached'>
  ) => Awaitable<readonly ApplicationCommandOptionChoiceData[]>;

  onButton?: (
    this: ExtendedClient,
    interaction: ButtonInteraction<'cached'>,
    buttonId: string
  ) => Awaitable<void>;

  onModalSubmit?: (
    this: ExtendedClient,
    interaction: ModalSubmitInteraction<'cached'>,
    modalId: string
  ) => Awaitable<void>;

  onSelectMenu?: (
    this: ExtendedClient,
    interaction: AnySelectMenuInteraction<'cached'>,
    menuId: string
  ) => Awaitable<void>;

  constructor(options: CommandOptions) {
    this.builder = options.builder;
    this.execute = options.execute;
    this.onAutocomplete = options.onAutocomplete;
    this.onButton = options.onButton;
    this.onModalSubmit = options.onModalSubmit;
    this.onSelectMenu = options.onSelectMenu;
  }
}
