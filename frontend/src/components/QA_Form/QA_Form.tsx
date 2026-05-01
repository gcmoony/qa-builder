import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import LoadingScreen from "../LoadingScreen";

const url = import.meta.env.VITE_DEV_MODE
  ? import.meta.env.VITE_BACKEND_LOCAL
  : import.meta.env.VITE_BACKEND_URL;

export const QA_Form = () => {
  const params = useParams();
  const nav = useNavigate();
  const [qa_data, set_qa_data] = useState({
    _id: null,
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQA = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }
      const request = await fetch(`${url}/api/qas/${params.id}`);
      const data = await request.json();
      set_qa_data({ ...data });
      setLoading(false);
    };
    loadQA();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (params.id) {
      await updateQA();
    } else {
      await createQA();
    }
    setIsSubmitting(false);
    // nav("/");
  };

  const createQA = async () => {
    const res = await fetch(`${url}/api/qas`, {
      method: "POST",
      body: JSON.stringify(qa_data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      nav("/");
    }
  };

  const updateQA = async () => {
    const res = await fetch(`${url}/api/qas/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(qa_data),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      nav("/");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className='flex flex-col items-center p-5'>
        <h2 className='text-3xl text-center my-5'>
          {params.id ? "Edit Q&A" : "Submit a Q&A"}
        </h2>
        <form
          className='qa-form  w-full flex flex-col gap-5 '
          onSubmit={handleSubmit}
        >
          <div className='input_component flex flex-col'>
            <label htmlFor='question_input'>Your Question</label>

            <textarea
              name='question_input'
              className='resize-none outline textarea  w-full'
              value={qa_data.question}
              onChange={(e) =>
                set_qa_data({ ...qa_data, question: e.target.value })
              }
            />
          </div>
          <div
            className={`input_component ${params.id ? "show" : "hide"}  flex flex-col `}
          >
            <label htmlFor='answer_input'>Answer</label>

            <textarea
              name='answer_input'
              value={qa_data.answer}
              className='resize-none outline textarea w-full'
              onChange={(e) =>
                set_qa_data({ ...qa_data, answer: e.target.value })
              }
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn-primary btn'
            >
              {isSubmitting ? (
                <span>
                  {params.id ? "Updating Q&A..." : "Submitting Question..."}
                </span>
              ) : (
                <span>{params.id ? "Edit Q&A" : "Submit Question"}</span>
              )}
            </button>
          </div>
        </form>
        <Link
          to={`/`}
          className='self-start flex gap-2 btn-link'
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
              d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
            />
          </svg>
          Back to Q&As
        </Link>
      </div>
    </div>
  );
};
