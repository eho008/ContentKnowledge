import { Link, useParams } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import { Note } from "../assets/types";
import NotePopup from "./NotePopup";

export default function Tiles({ items }: { items: Note[] }) {
  const numCols = useWindowSize();
  const id = useParams();

  return (
    <div style={{ columnCount: numCols, width: numCols * 245 }}>
      {items.map((item) => (
        <div key={item._id}>
          <Link to={`/contents/${item.content}/notes/${item._id}`}>
            {item._id === id.noteid && <NotePopup iteme={item} />}
            <div className="point-container hover:outline-1 hover:outline">
              {item.text}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
