import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-gradient mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found 😅</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;