import NavBar from '../components/navBar/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="w-full max-w-6xl">
        {children}
      </div>
    </>
  );
}
