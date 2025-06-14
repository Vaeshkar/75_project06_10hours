import { useState, useEffect } from 'react';

export default function EntryForm({ onSubmit, onCancel, setIsLoading, editingEntry }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingEntry) {
            setTitle(editingEntry.title || '');
            setDate(editingEntry.date || '');
            setImage(editingEntry.image || '');
            setContent(editingEntry.content || '');
        }
    }, [editingEntry]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (title && date && content) {
                onSubmit({ title, date, image: image || "https://picsum.photos/1024/1024", content });
                setTitle('');
                setDate('');
                setImage('');
                setContent('');
            } else {
                alert('Please fill in all fields.');
                setIsLoading(false);
            }
        }, 1500);
    }

    return (
        <div className="relative z-0">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-4 z-0">
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border-4 border-black rounded-3xl text-2xl font-bold placeholder:font-boldplaceholder:text-lg placeholder:text-black text-black"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 border-4 border-black rounded-3xl text-2xl font-bold placeholder:font-boldplaceholder:text-lg placeholder:text-black text-black"
            />
            <input
                type="text"
                placeholder='Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-4 border-4 border-black rounded-3xl text-2xl font-bold placeholder:font-boldplaceholder:text-lg placeholder:text-black text-black"
            />
            <textarea
                placeholder='Content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border-4 border-black rounded-3xl text-2xl font-bold placeholder:font-boldplaceholder:text-lg placeholder:text-black text-black"
                rows="4"
                maxLength={1000}
            ></textarea>
            <p className="text-left -mt-4 text-md text-black/80">
                {content.length}/1000 characters
            </p>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="font-bold border-4 border-black bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black transition-all pointer-cursor px-8 py-4 rounded-3xl duration-300 ease-in-out" style={{ fontSize: '4vw' }}>Cancel</button>
                <button
                    type="submit"
                    className="font-bold border-4 border-black bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black  transition-all pointer-cursor px-8 py-4 rounded-3xl duration-300 ease-in-out"
                    style={{ fontSize: '4vw' }}
                >
                    {editingEntry ? 'Save Entry' : 'Add Entry'}
                </button>
            </div>
        </form>
    </div>
    )
}