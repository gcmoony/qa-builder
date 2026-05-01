import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import { Link } from "react-router";

const url = import.meta.env.VITE_DEV_MODE
  ? import.meta.env.VITE_BACKEND_LOCAL
  : import.meta.env.VITE_BACKEND_URL;

export const ListWrapper = () => {
  const [qa_list, set_qa_list] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toBeDeleted, setToBeDeleted] = useState("");
  const modalElement = document.getElementById("confirm_delete");

  const handleModalOpen = (itemId) => {
    modalElement.showModal();
    setToBeDeleted(itemId);
  };

  const handleDelete = async () => {
    const result = await fetch(`${url}/api/qas/${toBeDeleted}`, {
      method: "DELETE",
    });
    if (result.ok) {
      setLoading(true);
      setToBeDeleted("");
      document.getElementById("confirm_delete").close();
    }
  };

  useEffect(() => {
    const loadList = async () => {
      const req = await fetch(`${url}/api/qas`);
      const data = await req.json();
      set_qa_list(data.questions_answers);
      setLoading(false);
    };

    if (loading) {
      loadList();
    }
  }, [loading]);

  return (
    <div>
      {/* Dialog */}
      <dialog
        id='confirm_delete'
        className='modal'
      >
        <div className='modal-box'>
          <div className='  flex flex-col text-center gap-5'>
            <h3 className='text-2xl'>Confirm Delete</h3>
            <p>Are you sure you want to delete this QA?</p>
            <div className='modal-action'>
              <form
                method='dialog'
                className='flex justify-between w-full'
              >
                <button className='btn btn-info'>Cancel</button>
                <button
                  className='btn hover:btn-error'
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  Delete QA
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      {/* FAB */}
      <div className='fab'>
        <div
          tabIndex={0}
          role='button'
          className='btn btn-lg btn-circle btn-primary'
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
              d='M3.75 9h16.5m-16.5 6.75h16.5'
            />
          </svg>
        </div>

        <div>
          New Question
          <Link
            className='btn btn-lg btn-circle'
            to={"/qa/new"}
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
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div>
        {qa_list.length > 0 ? (
          qa_list.map((item) => (
            <ListItem
              key={item._id}
              id={item._id}
              question={item.question}
              answer={item.answer}
              deleteHandler={handleModalOpen}
            />
          ))
        ) : (
          <p className='text-center'>No Questions Found</p>
        )}
      </div>
    </div>
  );
};
