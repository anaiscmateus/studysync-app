// Feed.jsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

export default function Feed({
  notes,
  handleDelete,
  handleUpdate,
  handleToggle,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${month}/${day}/${year}`;
  };

  return (
    <section
      id="feed"
      className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-3"
    >
      {notes.map((note, index) => (
        <Card
          key={index}
          className="shadow-lg border border-zinc-300 col-span-1"
        >
          <CardHeader>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold">{note.title}</p>
              <FontAwesomeIcon
                onClick={() => handleToggle(note._id)} // Add onClick event here
                icon={note.important ? fasFaStar : farFaStar}
                className={
                  note.important
                    ? "text-yellow-500 cursor-pointer"
                    : "text-black cursor-pointer"
                }
              />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-m">{note.content}</p>
          </CardBody>
          <CardFooter>
            <div className="w-full flex text-xs gap-1 justify-between items-center">
              <div>
                <p>Created: {formatDate(note.createdAt)}</p>
                <p>Updated: {formatDate(note.lastUpdated)}</p>
              </div>
              <div className="flex gap-2 items-center">
                <UpdateModal note={note} handleUpdate={handleUpdate} />
                <DeleteModal note={note} handleDelete={handleDelete} />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
