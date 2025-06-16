import { useState, useEffect } from 'react';


// import components
import Header from './components/Header';
import Footer from './components/Footer';
import EntryList from './components/EntryList';
import AddEntryModal from './components/AddEntryModal';
import ViewEntryModal from './components/ViewEntryModal';
import LoadingScreen from './components/LoadingScreen';
import AlertBox from './components/Alert/AlertBox';


export default function App() {

  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem("entries")) || []);
  useEffect(() => localStorage.setItem("entries", JSON.stringify(entries)), [entries]);

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addAlert = (message) => {
  const id = Date.now();
  setAlerts(prev => [...prev, { id, message }]);
  setTimeout(() => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, 3000);
};

  const handleAddEntry = (entryData) => {
    setIsLoading(true); // Start loading animation
    const entryDate = entryData.date || new Date().toISOString().split('T')[0];

    const alreadyExists = entries.some(entry => entry.date === entryDate && (!editingEntry || entry.id !== editingEntry.id));
    if (alreadyExists) {
      addAlert("An entry already exists for this day. Please come back tomorrow!");
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
        {/* <button
          onClick={() => addAlert("Test alert message! To see how long it stays and grows with a lot of text and how it looks when you click on it.")}
          className="fixed top-4 left-4 z-70 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Show Test Alert
        </button> */}
      <div className="fixed top-4 right-4 z-60 flex flex-col gap-4 items-end">
      {alerts.map(alert => (
        <AlertBox
          key={alert.id}
          message={alert.message}
          onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
        />
      ))}
    </div>
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