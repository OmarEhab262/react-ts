interface Iprops extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: Iprops) => {
  return (
    <span
      className={`block w-5 h-5  rounded-full cursor-pointer text-white hover:opacity-80`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};

export default CircleColor;
