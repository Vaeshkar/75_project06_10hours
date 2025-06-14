import EntryForm from "./AddEntryModal/EntryForm";

export default function AddEntryModal({ visible, onClose, handleSubmit, setIsLoading, editingEntry }) {
  return (
    <div className={`fixed inset-0 bg-black/60 flex justify-center items-center z-40 transition-opacity duration-700 ${
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="min-h-[80vh] w-4/5 bg-yellow-400 p-8 flex flex-col justify-between rounded-[3rem]">
        <h2 className="text-xl font-bold text-black mb-4" style={{ fontSize: '6vw' }}>
          {editingEntry ? 'Edit Diary Entry' : 'New Diary Entry'}
        </h2>
        <EntryForm
          onSubmit={(data) => {
            handleSubmit(data);
            setTimeout(() => onClose(), 500); // Delay modal close for animation
          }}
          onCancel={onClose}
          setIsLoading={setIsLoading}
          editingEntry={editingEntry}
        />
      </div>
    </div>
  );
}