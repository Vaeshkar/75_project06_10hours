export default function EntryCard({ entry, onEntryClick }) {
    return (
        <div onClick={() => onEntryClick(entry)}
            className="bg-white rounded-3xl p-8 pointer-cursor hover:scale-103 transition-all duration-300 ease-in-out" >
            <img src={entry.image} alt={entry.title} className="h-[35vh] w-full object-cover rounded-2xl mb-6" />
            <h3 className="font-bold text-black text-lg mb-1">{entry.title}</h3>
            <p className="text-black text-sm">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
    );
}