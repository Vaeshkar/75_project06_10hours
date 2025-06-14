import EntryDetails from './ViewEntryModal/EntryDetails';

export default function ViewEntryModal({ entry, onClose, setEntries, setShowAddModal, setShowViewModal, setEditingEntry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-4xl shadow-lg p-6 w-3/4 h-[60vh] overflow-y-auto max-w-6xl flex flex-col justify-between">
        <div className="absolute right-10 top-10 scale-200 z-20">
            <button onClick={onClose} className="text-sm font-bold bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black hover:scale-115 transition-all pointer-cursor px-4 py-2 rounded-full duration-300 ease-in-out" style={{ fontSize: '1.2rem' }}
            >
            X
            </button>
        </div>
        <EntryDetails entry={entry} onClose={onClose} />
        <div className="flex justify-end space-x-6">
            <button onClick={() => {
              setShowViewModal(false);
              setShowAddModal(true);
              setTimeout(() => setEditingEntry(entry), 0);
            }} className="font-bold bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black hover:scale-110 transition-all pointer-cursor px-8 py-4 rounded-3xl duration-300 ease-in-out" style={{ fontSize: '4vw' }}>
                Edit
            </button>

            <button className='font-bold bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black hover:scale-110 transition-all pointer-cursor px-8 py-4 rounded-3xl duration-300 ease-in-out'
            onClick={() => {
                setEntries(prev => prev.filter(e => e.id !== entry.id));
                onClose();
            }} style={{ fontSize: '4vw' }}>
                Delete
            </button>
        </div>
      </div>
      </div>
  );
}