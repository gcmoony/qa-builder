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
      <div>
        <form
          className='qa-form'
          onSubmit={handleSubmit}
        >
          <div className='input_component'>
            <label htmlFor='question_input'>Your Question</label>

            <textarea
              name='question_input'
              value={qa_data.question}
              onChange={(e) =>
                set_qa_data({ ...qa_data, question: e.target.value })
              }
            />
          </div>
          <div className={`input_component ${params.id ? "show" : "hide"}`}>
            <label htmlFor='answer_input'>Answer</label>

            <textarea
              name='answer_input'
              value={qa_data.answer}
              onChange={(e) =>
                set_qa_data({ ...qa_data, answer: e.target.value })
              }
            />
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                {params.id ? "Updating Q&A..." : "Submitting Question..."}
              </span>
            ) : (
              <span>{params.id ? "Edit Q&A" : "Submit Question"}</span>
            )}
          </button>
        </form>
        <Link to={`/`}>Back to Q&As</Link>
      </div>
    </div>
  );
};
