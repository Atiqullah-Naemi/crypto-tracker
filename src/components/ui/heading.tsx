interface HeadingProps {
  title: string;
  subTitle?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="my-5">
      <h1 className="text-2xl font-semibold"> {title} </h1>
      <p className="text-neutral-500"> {subTitle} </p>
    </div>
  );
};
