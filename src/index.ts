#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init.js';
import { dev } from './commands/dev.js';
import { build } from './commands/build.js';

const program = new Command();

program
  .name('mayboll-docs')
  .description('Generate static documentation sites from Markdown files')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold a new documentation site in ./docs/')
  .action(init);

program
  .command('dev')
  .description('Start the development server')
  .action(dev);

program
  .command('build')
  .description('Build the documentation site for production')
  .action(build);

program.parse();
