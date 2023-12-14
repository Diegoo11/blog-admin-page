import Divider from '../utils/Divider';

export default function Title({ text = 'ADMIN PAGE' }) {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center my-20 text-center">
        <span className="text-6xl sm:text-7xl md:text-8xl font-extrabold">
          {text}
        </span>
      </div>
      <Divider />
    </>
  );
}
