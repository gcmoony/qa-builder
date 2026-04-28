import { useState } from "react";
import { Link } from "react-router";
import { Alert } from "../Alerts/Alert";
import { CollapseContent } from "../CollapseContent";

const url = import.meta.env.VITE_DEV_MODE
  ? import.meta.env.VITE_BACKEND_LOCAL
  : import.meta.env.VITE_BACKEND_URL;

export const ListItem = ({ id, question, answer }) => {
  const [itemData, setItemData] = useState({
    _id: id,
    question: question,
    answer: answer,
  });

  const [updatedData, setUpdatedData] = useState({
    _id: id,
    question: question,
    answer: answer,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAnswer = async () => {
    try {
      const res = await fetch(`${url}/api/qas/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setItemData({ ...updatedData });
      }
    } catch (err) {
      setTimeout(() => {
        setError("");
      }, 4000);
      setError("Unable to update answer");
      // setUpdatedData({ ...itemData });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setError("");
    setLoading(true);
    updateAnswer();
  };

  return (
    <CollapseContent title={question}>
      <div>
        {itemData.answer ? (
          <div className='flex justify-between'>
            <span>{itemData.answer}</span>
            <Link to={`/qa/edit/${id}`}>Edit Q&A</Link>
          </div>
        ) : (
          <div className='flex flex-col '>
            {loading && (
              <span className='loading loading-dots loading-md'></span>
            )}
            {error && <Alert message={error} />}

            <label htmlFor='answer_input'>Response</label>

            <textarea
              name='answer_input'
              placeholder='Pending answer...'
              value={updatedData.answer}
              disabled={loading}
              className={`resize-none textarea`}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, answer: e.target.value })
              }
              onBlur={handleSubmit}
            />
          </div>
        )}
      </div>
    </CollapseContent>
  );
};
