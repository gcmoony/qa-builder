import { useState } from "react";
import { Link } from "react-router";
import { Alert } from "../Alerts/Alert";
import { CollapseContent } from "../CollapseContent";

const url = import.meta.env.VITE_DEV_MODE
  ? import.meta.env.VITE_BACKEND_LOCAL
  : import.meta.env.VITE_BACKEND_URL;

export const ListItem = ({ id, question, answer, deleteHandler }) => {
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
            <div className='flex gap-2 flex-col'>
              <Link
                to={`/qa/edit/${id}`}
                className='btn'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                  />
                </svg>
                Edit
              </Link>
              <button
                className='btn text-error'
                onClick={() => deleteHandler(id)}
              >
                Delete
              </button>
            </div>
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
              className={`resize-none textarea w-full`}
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
