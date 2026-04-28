export const CollapseContent = ({ title, children }) => {
  return (
    <div className='collapse collapse-arrow bg-base-100 border border-base-300'>
      <input type='checkbox' />
      <div className='collapse-title font-semibold'>{title}</div>
      <div className='collapse-content text-sm'>{children}</div>
    </div>
  );
};
