export const Divider = ({ width }: { width?: string }) => {
  console.log(width);

  return width ? (
    <hr className={`w-4/6 lg:${width} m-auto border border-secondary `}></hr>
  ) : (
    <hr className='w-4/6 lg:w-2/6 m-auto border border-secondary'></hr>
  );
};
