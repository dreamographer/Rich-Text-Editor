import { type Editor } from '@tiptap/react';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToolbarButton } from '../toolbar-button';
import { TableInsertBlock } from './table-insert-block';
import type { VariantProps } from 'class-variance-authority';
import type { toggleVariants } from '@/components/ui/toggle';
import { LucideTable } from 'lucide-react';

interface TableInsertPopover extends VariantProps<typeof toggleVariants> {
	editor: Editor;
}

const TableInsertPopover = ({ editor, size, variant }: TableInsertPopover) => {
	const [open, setOpen] = React.useState(false);

	const onSetRowCol = React.useCallback(
		(cols: number, rows: number) => {
			editor
				.chain()
				.focus()
				.insertTable({ rows, cols })
				.run();
			

			// Find the table node by searching up from current position
			const pos = editor.state.selection.$anchor.pos;
			const resolvedPos = editor.state.doc.resolve(pos);
			let depth = resolvedPos.depth;
			let tablePos;
			console.log(depth);
			// Walk up the tree until we find the table node
			while (depth > 0) {
				const node = resolvedPos.node(depth);
				if (node.type.name === 'table') {
					tablePos = resolvedPos.before(depth);
					break;
				}
				depth--;
			}
			console.log(depth);
			if (tablePos !== undefined) {
				const tableNode = editor.state.doc.nodeAt(tablePos);
				const endPos = tablePos + (tableNode?.nodeSize || 0);

				// Insert paragraph after the table
				editor
					.chain()
					.insertContentAt(endPos, { 
						type: 'paragraph', 
						content: [{ type: 'text', text: ' ' }] 
					})
					.run();
			}
		},
		[editor]
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<ToolbarButton
					isActive={editor.isActive('link')}
					tooltip="Table"
					aria-label="Insert table"
					disabled={editor.isActive('codeBlock')}
					size={size}
					variant={variant}
				>
					<LucideTable className="size-5" />
				</ToolbarButton>
			</PopoverTrigger>
			<PopoverContent className="w-full min-w-60" align="start" side="bottom">
				<TableInsertBlock onSave={onSetRowCol} defaultCols={3} defaultRows={3} />
			</PopoverContent>
		</Popover>
	);
};

export { TableInsertPopover };
