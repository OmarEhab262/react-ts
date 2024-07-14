interface Iprops {
  imgUrl: string;
  alt: string;
  className?: string;
}

const Image = ({ imgUrl, alt, className }: Iprops) => {
  return <img src={imgUrl} className={className} alt={alt} />;
};

export default Image;
