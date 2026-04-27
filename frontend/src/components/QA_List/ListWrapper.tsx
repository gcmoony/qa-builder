import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import { Link } from "react-router";

export const ListWrapper = () => {
  const [qa_list, set_qa_list] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadList = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/qas`);
      const data = await req.json();
      set_qa_list(data.questions_answers);
      setLoading(false);
    };

    if (loading) {
      loadList();
    }
  }, []);

  return (
    <div>
      <Link to={"/qa/new"}>New Question</Link>
      <div>
        {qa_list.map((item) => (
          <ListItem
            key={item._id}
            id={item._id}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};
