export default function EntryDetails({ entry }) { 
    if (!entry) {
    return <p className="text-center text-gray-500">No entry selected.</p>;
  }

  return (
    <div className="relative space-y-4 p-4">
      
      <img src={entry.image} alt={entry.title} className="rounded-3xl h-[35vh] w-full object-cover" />
      <div className="flex gap-4 items-end">
        <h2 className="text-5xl font-bold text-black">{entry.title}</h2>
        <p className="text-xl text-black">{new Date(entry.date).toLocaleString()}</p>
      </div>
      <div className="mt-4 whitespace-pre-wrap text-black">
        {entry.content}
      </div>
    </div>
  );
}