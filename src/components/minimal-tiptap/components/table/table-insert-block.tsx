import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface TableInsertProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultRows?: number;
	defaultCols?: number;
	onSave: (cols: number, rows: number) => void;
}

export const TableInsertBlock = React.forwardRef<HTMLDivElement, TableInsertProps>(
	({ onSave, defaultRows, defaultCols, className }, ref) => {
		const formRef = React.useRef<HTMLDivElement>(null);
		const [cols, setCols] = React.useState(defaultCols ?? 0);
		const [rows, setRows] = React.useState(defaultRows ?? 0);

		const handleSave = React.useCallback(
			(e: React.FormEvent) => {
				e.preventDefault();
				if (formRef.current) {
					const isValid = Array.from(formRef.current.querySelectorAll('input')).every((input) =>
						input.checkValidity()
					);

					if (isValid) {
						onSave(cols, rows);
					} else {
						formRef.current.querySelectorAll('input').forEach((input) => {
							if (!input.checkValidity()) {
								input.reportValidity();
							}
						});
					}
				}
			},
			[onSave, cols, rows]
		);

		React.useImperativeHandle(ref, () => formRef.current!);

		return (
			<div ref={formRef}>
				<div className={cn('space-y-4', className)}>
					<div className="flex gap-2">
						<div className="space-y-1">
							<Label>Rows</Label>
							<Input
								className="w-16"
								type="number"
								required
								placeholder="Enter display text"
								value={rows}
								onChange={(e) => setRows(+e.target.value)}
							/>
						</div>

						<div className="space-y-1">
							<Label>Columns</Label>
							<Input
							className="w-16"
								type="number"
								required
								placeholder="Number of Columns"
								value={cols}
								onChange={(e) => setCols(+e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<Button disabled={true}>Browse Templates</Button>
					</div>

					<div className="flex justify-end space-x-2">
						<Button type="button" onClick={handleSave}>
							Insert
						</Button>
					</div>
				</div>
			</div>
		);
	}
);

TableInsertBlock.displayName = 'LinkEditBlock';

export default TableInsertBlock;
