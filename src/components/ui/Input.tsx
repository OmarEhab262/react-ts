interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: Iprops) => {
  return (
    <input
      className="border-2 border-gray-400 mb-3 rounded-md p-1 focus:outline-none focus:border-blue-400 focus:ring-1"
      {...rest}
    />
  );
};

export default Input;
