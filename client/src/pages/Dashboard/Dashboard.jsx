// Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkLogin,
  logoutUser,
  createNote,
  fetchNotes,
  deleteNote,
  updateNote,
  toggleImportance,
} from "../../utils/api";
import Search from "../../components/dashboard/Search/Search";
import NavComponent from "../../components/default/NavComponent";
import SubmitModal from "../../components/dashboard/SubmitModal/SubmitModal";
import Feed from "../../components/dashboard/Feed/Feed";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // Start loading
      try {
        const { isAuthenticated } = await checkLogin();
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
        const notesData = await fetchNotes();
        const sortedNotes = sortNotes(notesData);
        setNotes(sortedNotes);
      } catch (error) {
        console.error(error.message);
      }
      setIsLoading(false); // End loading
    };

    loadData();
  }, [navigate]);

  function compareNotes(a, b) {
    // Sort important notes first
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;

    // If both have the same 'important' status, sort by 'lastUpdated'
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  }

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]); // Re-run when notes or searchQuery changes

  const sortNotes = (notesArray) => {
    return notesArray.sort(compareNotes);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error.message);
      // Handle logout error
    }
  };

  const handleNewNote = async (formState) => {
    try {
      // Create the new note
      const newNote = await createNote(formState);

      // Update notes state to include the newly created note and re-sort
      setNotes((prevNotes) => sortNotes([...prevNotes, newNote.data]));

      toast.success("Note Successfully Added!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oh no! Something went wrong.", { position: "bottom-right" });
    }
  };

  const handleUpdate = async (noteId, formState) => {
    try {
      const response = await updateNote(noteId, formState);
      const updatedNote = response.note; // Extract the note from the response

      // Update the specific note in the notes array and sort after updating
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note._id === noteId ? updatedNote : note
        );
        return sortNotes(updatedNotes); // Call sort function after updating
      });

      toast.success("Note Successfully Updated!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oh no! Something went wrong.", { position: "bottom-right" });
    }
  };

  const handleToggle = async (noteId) => {
    try {
      const response = await toggleImportance(noteId);
      const updatedNote = response.note; // Adjusted to extract the note from the response object

      // Update the specific note in the notes array and sort after updating
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        return sortNotes(updatedNotes); // Call sort function after updating
      });

      toast.success("Note Successfully Updated!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oh no! Something went wrong.", { position: "bottom-right" });
    }
  };

  const handleDelete = async (noteId) => {
    try {
      // Delete the note
      await deleteNote(noteId);

      // Remove the deleted note from the notes state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));

      toast.success("Note Successfully Deleted!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oh no! Something went wrong.", { position: "bottom-right" });
    }
  };

  return (
    <>
      <NavComponent handleLogout={handleLogout} />
      {isLoading ? (
        <div className="flex justify-center pt-16">
          <Spinner
            label="Loading..."
            size="lg"
            color="secondary"
            labelColor="secondary"
          />
        </div>
      ) : (
        <>
          <section id="dashboard-page" className="flex justify-center">
            <div
              id="wrapper"
              className="w-full max-w-5xl flex justify-between gap-4 p-6"
            >
              <section className="w-full flex items-center gap-6">
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <SubmitModal handleNewNote={handleNewNote} />
              </section>
            </div>
          </section>
          <section className="flex justify-center">
            <div
              id="wrapper"
              className="w-full max-w-5xl flex justify-between gap-4 pb-6 px-6"
            >
              <section className="w-full flex items-center gap-6">
                <Feed
                  notes={filteredNotes}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  handleToggle={handleToggle}
                />
              </section>
            </div>
          </section>
          <ToastContainer />
        </>
      )}
    </>
  );
}
