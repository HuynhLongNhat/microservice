import { Button } from "@/components/ui/button"; // Assuming shadcn/ui components
import { ArrowLeft, AlertTriangle } from "lucide-react"; // Icons from lucide-react

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="max-w-lg text-center">
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => (window.location.href = "/")}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
