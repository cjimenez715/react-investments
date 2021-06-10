export default function Main({ children = 'Main Content' }) {
  return (
    <>
      <div className="container mx-auto p-4">{children}</div>
    </>
  );
}
