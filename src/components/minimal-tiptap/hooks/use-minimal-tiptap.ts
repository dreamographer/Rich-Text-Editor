import * as React from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import type { Content, UseEditorOptions } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import { Typography } from '@tiptap/extension-typography';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import Gapcursor from "@tiptap/extension-gapcursor";
import {
	Link,
	Image,
	HorizontalRule,
	CodeBlockLowlight,
	Selection,
	Color,
	UnsetAllMarks,
	ResetMarksOnEnter,
} from '../extensions';
import { cn } from '@/lib/utils';
import { getOutput } from '../utils';
import { useThrottle } from '../hooks/use-throttle';
import Highlight from '@tiptap/extension-highlight';
import ImageResize from 'tiptap-extension-resize-image';
import { IndentHandler } from '../extensions/indent';
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
	value?: Content;
	output?: 'html' | 'json' | 'text';
	placeholder?: string;
	editorClassName?: string;
	throttleDelay?: number;
	onUpdate?: (content: Content) => void;
	onBlur?: (content: Content) => void;
}

const createExtensions = (placeholder: string) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    paragraph: { HTMLAttributes: { class: "text-node" } },
    heading: { HTMLAttributes: { class: "heading-node" } },
    blockquote: { HTMLAttributes: { class: "block-node" } },
    bulletList: { HTMLAttributes: { class: "list-node" } },
    orderedList: { HTMLAttributes: { class: "list-node" } },
    code: { HTMLAttributes: { class: "inline", spellcheck: "false" } },
    dropcursor: false,
  }),
  Link,
  Image,
  ImageResize,
  Color,
  TextStyle,
  Selection,
  Typography,
  UnsetAllMarks,
  HorizontalRule,
  ResetMarksOnEnter,
  CodeBlockLowlight,
  IndentHandler,
  Gapcursor.configure({
    class: 'my-gapcursor-class',
  }),
  Highlight.configure({ multicolor: true }),
  Placeholder.configure({ placeholder: () => placeholder }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "center",
  }),
  Table.configure({
    resizable: true,
    handleWidth: 5,
    cellMinWidth: 100,
    lastColumnResizable: true,
    HTMLAttributes: {
      class: "plate-table",
    },
    allowTableNodeSelection: true,
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "plate-table-row",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "plate-table-cell data-[editor-selected=true]:bg-muted/50",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "plate-table-header",
    },
  }),
];

export const useMinimalTiptapEditor = ({
	value,
	output = 'html',
	placeholder = '',
	editorClassName,
	throttleDelay = 1000,
	onUpdate,
	onBlur,
	...props
}: UseMinimalTiptapEditorProps) => {
	const throttledSetValue = useThrottle((value: Content) => onUpdate?.(value), throttleDelay);

	const handleUpdate = React.useCallback(
		(editor: Editor) => throttledSetValue(getOutput(editor, output)),
		[output, throttledSetValue]
	);

	const handleCreate = React.useCallback(
		(editor: Editor) => {
			if (value && editor.isEmpty) {
				editor.commands.setContent(value, false, { preserveWhitespace: 'full' });
			}
		},
		[value]
	);

	const handleBlur = React.useCallback((editor: Editor) => onBlur?.(getOutput(editor, output)), [output, onBlur]);

	const editor = useEditor({
		extensions: createExtensions(placeholder!),
		parseOptions: {
			preserveWhitespace: 'full',
		},
		editorProps: {
			attributes: {
				autocomplete: 'off',
				autocorrect: 'off',
				autocapitalize: 'off',
				class: cn('focus:outline-none', editorClassName),
			},
		},
		onUpdate: ({ editor }) => handleUpdate(editor),
		onCreate: ({ editor }) => handleCreate(editor),
		onBlur: ({ editor }) => handleBlur(editor),
		...props,
	});

	return editor;
};

export default useMinimalTiptapEditor;
