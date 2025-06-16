import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import EntryCard from './EntryList/EntryCard';

export default function EntryList({ entries, onEntryClick }) {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from('.entry-card', {
            y: '100vh',
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            delay: 0.8,
            ease: 'power3.out'
        });
    }, [entries]);

    if (entries.length === 0) {
        return <p className='text-center text-yellow-500 text-[6vw] font-bold bagel-fat-one-regular uppercase leading-[.8]'>No entries yet...</p>
    }

    return (
        <div ref={containerRef} className='w-full grid grid-cols-1 gap-8 p-4'>
            {entries
                .slice()
                .reverse()
                .map((entry) => (
                    <div key={entry.id} className="entry-card">
                        <EntryCard entry={entry} onEntryClick={onEntryClick} />
                    </div>
                ))
            }
        </div>
    );
}