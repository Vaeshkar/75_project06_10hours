import { useState, useEffect } from 'react';


// import components
import Header from './components/Header';
import Footer from './components/Footer';
import EntryList from './components/EntryList';
import AddEntryModal from './components/AddEntryModal';
import ViewEntryModal from './components/ViewEntryModal';
import LoadingScreen from './components/LoadingScreen';


export default function App() {

  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem("entries")) || []);
  useEffect(() => localStorage.setItem("entries", JSON.stringify(entries)), [entries]);

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entryData) => {
    setIsLoading(true); // Start loading animation
    const entryDate = entryData.date || new Date().toISOString().split('T')[0];

    const alreadyExists = entries.some(entry => entry.date === entryDate && (!editingEntry || entry.id !== editingEntry.id));
    if (alreadyExists) {
      alert("An entry already exists for this day. Please come back tomorrow!");
      setIsLoading(false);
      return;
    }

    const newEntry = {
      ...editingEntry,
      ...entryData,
      id: editingEntry ? editingEntry.id : Date.now(),
      date: entryDate,
      image: entryData.image || "https://picsum.photos/1024/1024",
      content: entryData.content || "No content provided",
    };

    if (editingEntry) {
      const updatedEntries = entries.map(entry =>
        entry.id === editingEntry.id ? newEntry : entry
      );
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, newEntry]);
    }
    setShowAddModal(false);
  };

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const loadingScreen = isLoading && (
    <LoadingScreen onComplete={() => {
      setShowAddModal(true);
      setIsLoading(false);
    }} />
  );

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4">
        {loadingScreen}
        <Header onAddEntry={() => {
          setIsLoading(true);
          
        }} />
        <main className="flex items-center justify-center z-20">
          <div className='w-full'>
            <EntryList entries={entries} onEntryClick={handleSelectEntry} />
            <AddEntryModal 
              visible={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setEditingEntry(null);
              }}
              handleSubmit={handleAddEntry}
              setIsLoading={setIsLoading}
              editingEntry={showAddModal ? editingEntry : null}
            />
            { showViewModal && (
              <ViewEntryModal 
                entry={selectedEntry} 
                visible={showViewModal}
                onClose={() => setShowViewModal(false)} 
                setEntries={setEntries}
                setShowAddModal={setShowAddModal}
                setShowViewModal={setShowViewModal}
                setEditingEntry={setEditingEntry}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );

}