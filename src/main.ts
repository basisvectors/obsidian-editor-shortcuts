import { Plugin } from 'obsidian';
import {
  addCursorsToSelectionEnds,
  copyLine,
  deleteSelectedLines,
  deleteToEndOfLine,
  expandSelectionToBrackets,
  expandSelectionToQuotes,
  expandSelectionToQuotesOrBrackets,
  goToHeading,
  goToLineBoundary,
  insertLineAbove,
  insertLineBelow,
  joinLines,
  moveCursor,
  navigateLine,
  selectAllOccurrences,
  selectLine,
  selectWordOrNextOccurrence,
  transformCase,
  levelToHeading,
} from './actions';
import {
  defaultMultipleSelectionOptions,
  withMultipleSelections,
} from './utils';
import { CASE, DIRECTION } from './constants';
import { insertLineBelowHandler } from './custom-selection-handlers';

export default class CodeEditorShortcuts extends Plugin {
  onload() {
    this.addCommand({
      id: 'insertLineAbove',
      name: 'Insert line above',
      hotkeys: [
        {
          modifiers: ['Mod', 'Shift'],
          key: 'Enter',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, insertLineAbove),
    });

    this.addCommand({
      id: 'insertLineBelow',
      name: 'Insert line below',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: 'Enter',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, insertLineBelow, {
          ...defaultMultipleSelectionOptions,
          customSelectionHandler: insertLineBelowHandler,
        }),
    });

    this.addCommand({
      id: 'deleteLine',
      name: 'Delete line',
      hotkeys: [
        {
          modifiers: ['Mod', 'Shift'],
          key: 'K',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, deleteSelectedLines),
    });

    this.addCommand({
      id: 'deleteToEndOfLine',
      name: 'Delete to end of line',
      editorCallback: (editor) =>
        withMultipleSelections(editor, deleteToEndOfLine),
    });

    this.addCommand({
      id: 'joinLines',
      name: 'Join lines',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: 'J',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, joinLines, {
          ...defaultMultipleSelectionOptions,
          repeatSameLineActions: false,
        }),
    });

    this.addCommand({
      id: 'duplicateLine',
      name: 'Duplicate line',
      hotkeys: [
        {
          modifiers: ['Mod', 'Shift'],
          key: 'D',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, copyLine, {
          ...defaultMultipleSelectionOptions,
          args: 'down',
        }),
    });

    this.addCommand({
      id: 'copyLineUp',
      name: 'Copy line up',
      hotkeys: [
        {
          modifiers: ['Alt', 'Shift'],
          key: 'ArrowUp',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, copyLine, {
          ...defaultMultipleSelectionOptions,
          args: 'up',
        }),
    });

    this.addCommand({
      id: 'copyLineDown',
      name: 'Copy line down',
      hotkeys: [
        {
          modifiers: ['Alt', 'Shift'],
          key: 'ArrowDown',
        },
      ],
      editorCallback: (editor) =>
        withMultipleSelections(editor, copyLine, {
          ...defaultMultipleSelectionOptions,
          args: 'down',
        }),
    });
    this.addCommand({
      id: 'levelToH1',
      name: 'Level to H1',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: '1',
        },
      ],
      editorCallback: (editor) => levelToHeading(editor, 1),
    });
    this.addCommand({
      id: 'levelToH2',
      name: 'Level to H2',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: '2',
        },
      ],
      editorCallback: (editor) => levelToHeading(editor, 2),
    });
    this.addCommand({
      id: 'levelToH3',
      name: 'Level to H3',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: '3',
        },
      ],
      editorCallback: (editor) => levelToHeading(editor, 3),
    });
    this.addCommand({
      id: 'levelToH4',
      name: 'Level to H4',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: '4',
        },
      ],
      editorCallback: (editor) => levelToHeading(editor, 4),
    });
    this.addCommand({
      id: 'selectWordOrNextOccurrence',
      name: 'Select word or next occurrence',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: 'D',
        },
      ],
      editorCallback: (editor) => selectWordOrNextOccurrence(editor),
    });

    this.addCommand({
      id: 'selectAllOccurrences',
      name: 'Select all occurrences',
      hotkeys: [
        {
          modifiers: ['Mod', 'Shift'],
          key: 'L',
        },
      ],
      editorCallback: (editor) => selectAllOccurrences(editor),
    });

    this.addCommand({
      id: 'selectLine',
      name: 'Select line',
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: 'L',
        },
      ],
      editorCallback: (editor) => withMultipleSelections(editor, selectLine),
    });

    this.addCommand({
      id: 'addCursorsToSelectionEnds',
      name: 'Add cursors to selection ends',
      hotkeys: [
        {
          modifiers: ['Alt', 'Shift'],
          key: 'I',
        },
      ],
      editorCallback: (editor) => addCursorsToSelectionEnds(editor),
    });

    this.addCommand({
      id: 'goToLineStart',
      name: 'Go to start of line',
      editorCallback: (editor) =>
        withMultipleSelections(editor, goToLineBoundary, {
          ...defaultMultipleSelectionOptions,
          args: 'start',
        }),
    });

    this.addCommand({
      id: 'goToLineEnd',
      name: 'Go to end of line',
      editorCallback: (editor) =>
        withMultipleSelections(editor, goToLineBoundary, {
          ...defaultMultipleSelectionOptions,
          args: 'end',
        }),
    });

    this.addCommand({
      id: 'goToNextLine',
      name: 'Go to next line',
      editorCallback: (editor) =>
        withMultipleSelections(editor, navigateLine, {
          ...defaultMultipleSelectionOptions,
          args: 'down',
        }),
    });

    this.addCommand({
      id: 'goToPrevLine',
      name: 'Go to previous line',
      editorCallback: (editor) =>
        withMultipleSelections(editor, navigateLine, {
          ...defaultMultipleSelectionOptions,
          args: 'up',
        }),
    });

    this.addCommand({
      id: 'goToNextChar',
      name: 'Move cursor forward',
      editorCallback: (editor) =>
        withMultipleSelections(editor, moveCursor, {
          ...defaultMultipleSelectionOptions,
          args: DIRECTION.FORWARD,
        }),
    });

    this.addCommand({
      id: 'goToPrevChar',
      name: 'Move cursor backward',
      editorCallback: (editor) =>
        withMultipleSelections(editor, moveCursor, {
          ...defaultMultipleSelectionOptions,
          args: DIRECTION.BACKWARD,
        }),
    });

    this.addCommand({
      id: 'transformToUppercase',
      name: 'Transform selection to uppercase',
      editorCallback: (editor) =>
        withMultipleSelections(editor, transformCase, {
          ...defaultMultipleSelectionOptions,
          args: CASE.UPPER,
        }),
    });

    this.addCommand({
      id: 'transformToLowercase',
      name: 'Transform selection to lowercase',
      editorCallback: (editor) =>
        withMultipleSelections(editor, transformCase, {
          ...defaultMultipleSelectionOptions,
          args: CASE.LOWER,
        }),
    });

    this.addCommand({
      id: 'transformToTitlecase',
      name: 'Transform selection to title case',
      editorCallback: (editor) =>
        withMultipleSelections(editor, transformCase, {
          ...defaultMultipleSelectionOptions,
          args: CASE.TITLE,
        }),
    });

    this.addCommand({
      id: 'expandSelectionToBrackets',
      name: 'Expand selection to brackets',
      editorCallback: (editor) =>
        withMultipleSelections(editor, expandSelectionToBrackets),
    });

    this.addCommand({
      id: 'expandSelectionToQuotes',
      name: 'Expand selection to quotes',
      editorCallback: (editor) =>
        withMultipleSelections(editor, expandSelectionToQuotes),
    });

    this.addCommand({
      id: 'expandSelectionToQuotesOrBrackets',
      name: 'Expand selection to quotes or brackets',
      editorCallback: (editor) => expandSelectionToQuotesOrBrackets(editor),
    });

    this.addCommand({
      id: 'goToNextHeading',
      name: 'Go to next heading',
      editorCallback: (editor) => goToHeading(this.app, editor, 'next'),
    });

    this.addCommand({
      id: 'goToPrevHeading',
      name: 'Go to previous heading',
      editorCallback: (editor) => goToHeading(this.app, editor, 'prev'),
    });
  }
}
