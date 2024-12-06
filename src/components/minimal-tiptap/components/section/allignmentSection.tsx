import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'

const AlignmentSection = ({ editor }: { editor: Editor }) => (
  <div className="flex items-center gap-1">
    <button
      onClick={() => editor.chain().focus().setTextAlign('left').run()}
      className={cn('p-2 hover:bg-muted rounded', { 'bg-muted': editor.isActive({ textAlign: 'left' }) })}
      title="Align left"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
    </button>
    <button
      onClick={() => editor.chain().focus().setTextAlign('center').run()}
      className={cn('p-2 hover:bg-muted rounded', { 'bg-muted': editor.isActive({ textAlign: 'center' }) })}
      title="Align center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="18" x2="6" y1="12" y2="12"/><line x1="21" x2="3" y1="18" y2="18"/></svg>
    </button>
    <button
      onClick={() => editor.chain().focus().setTextAlign('right').run()}
      className={cn('p-2 hover:bg-muted rounded', { 'bg-muted': editor.isActive({ textAlign: 'right' }) })}
      title="Align right"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
    </button>
    <button
      onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      className={cn('p-2 hover:bg-muted rounded', { 'bg-muted': editor.isActive({ textAlign: 'justify' }) })}
      title="Justify"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="12" y2="12"/><line x1="21" x2="3" y1="18" y2="18"/></svg>
    </button>
  </div>
)  

export default AlignmentSection