import { Link } from "react-router";

export const ListItem = ({ id, question, answer }) => {
  return (
    <div className='card'>
      <p className='question'>{question}</p>
      <p className='answer'>{answer ? answer : "Pending answer..."}</p>
      <Link to={`/qa/edit/${id}`}>Edit</Link>
    </div>
  );
};
