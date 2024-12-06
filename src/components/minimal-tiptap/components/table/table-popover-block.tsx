import { ToolbarButton } from '../toolbar-button';
import TablePopoverInsertMenu from './table-popover-insert-menu';

interface TablePopoverBlockProps {
	onMerge: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onUnmerge: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onRemove: () => void;
	canMerge: boolean;
	canUnmerge: boolean;
	insertRowAbove: () => void;
	insertRowBelow: () => void;
	insertColumnLeft: () => void;
	insertColumnRight: () => void;
	deleteRow: () => void;
	deleteColumn: () => void;
}

const TablePopoverBlock = ({
	canMerge,
	canUnmerge,
	onMerge,
	onUnmerge,
	onRemove,
	insertRowAbove,
	insertRowBelow,
	insertColumnLeft,
	insertColumnRight,
	deleteRow,
	deleteColumn,
}: Readonly<TablePopoverBlockProps>) => {

	return (
    <div className="flex h-10 rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        {canMerge && (
          <ToolbarButton
            tooltip="Merge Cells"
            onClick={onMerge}
            className="w-auto px-2"
          >
            Merge
          </ToolbarButton>
        )}
        {canUnmerge && (
          <ToolbarButton
            tooltip="Unmerge Cells"
            onClick={onUnmerge}
            className="w-auto px-2"
          >
            Unmerge
          </ToolbarButton>
        )}
        <TablePopoverInsertMenu
          insertColumnLeft={insertColumnLeft}
          insertColumnRight={insertColumnRight}
          insertRowAbove={insertRowAbove}
          insertRowBelow={insertRowBelow}
          deleteRow={deleteRow}
          deleteColumn={deleteColumn}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};

export { TablePopoverBlock };
