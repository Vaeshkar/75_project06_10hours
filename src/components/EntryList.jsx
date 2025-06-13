import EntryCard from './EntryList/EntryCard';

export default function EntryList({ entries, onEntryClick }) {
    if (entries.length === 0) {
        return <p className='text-center text-black'>No entries yet...</p>
    }

    return (
        <div className='w-full grid grid-cols-1 gap-8 p-4'>
            {entries
                .slice()
                .reverse()
                .map((entry) => (
                    <EntryCard key={entry.id} entry={entry} onEntryClick={onEntryClick} />
                ))
            }
        </div>
    );
}