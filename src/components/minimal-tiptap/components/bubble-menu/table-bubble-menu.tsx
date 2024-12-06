import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import { TablePopoverBlock } from '../table/table-popover-block';
import { ShouldShowProps } from '../../types';
import { useState } from 'react';

const TableBubbleMenu = ({ editor }: { editor: Editor }) => {
	const [canMerge, setCanMerge] = useState(false);
	const [canUnmerge, setCanUnmerge] = useState(false);

	const shouldShow = ({ editor}: ShouldShowProps) => {
		setCanMerge(() => editor.can().mergeCells());
		setCanUnmerge(() => editor.can().splitCell());

		return (
			editor.isActive('table') ||
			editor.isActive('tableCell') ||
			editor.isActive('tableHeader') ||
			editor.isActive('tableRow')
		);
	};

	const removeTable = () => {
		editor.chain().focus().deleteTable().run();
	}

	const mergeCells = () => {
		editor.chain().focus().mergeCells().run();
	};

	
	const unmergeCells = () => {
		editor.chain().focus().splitCell().run();
	};

	const insertRowAbove = () => {
		editor.chain().focus().addRowBefore().run();
	};

	const insertRowBelow = () => {
		editor.chain().focus().addRowAfter().run();
	};

	const insertColumnLeft = () => {
		editor.chain().focus().addColumnBefore().run();
	};

	const insertColumnRight = () => {
		editor.chain().focus().addColumnAfter().run();
	};

	const deleteRow = () => {
		editor.chain().focus().deleteRow().run();
	};

	const deleteColumn = () => {
		editor.chain().focus().deleteColumn().run();
	};

	return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: "bottom",
        offset: [0, 8],
        trigger: "manual",
      }}
    >
      <TablePopoverBlock
        insertColumnLeft={insertColumnLeft}
        insertColumnRight={insertColumnRight}
        insertRowAbove={insertRowAbove}
        insertRowBelow={insertRowBelow}
        deleteRow={deleteRow}
        deleteColumn={deleteColumn}
        canMerge={canMerge}
        canUnmerge={canUnmerge}
        onMerge={mergeCells}
        onUnmerge={unmergeCells}
        onRemove={removeTable}
      />
    </BubbleMenu>
  );
};

export { TableBubbleMenu };
