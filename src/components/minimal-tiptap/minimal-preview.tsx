import './styles/index.css';

interface MinimalTipTapPreviewProps {
	children: React.ReactNode;
}

export function MinimalTipTapPreview({ children }: Readonly<MinimalTipTapPreviewProps>) {
	return (
		<div className="minimal-tiptap-editor tiptap">
			<div className="ProseMirror !pb-2">
				{children}
			</div>
		</div>
	);
}
