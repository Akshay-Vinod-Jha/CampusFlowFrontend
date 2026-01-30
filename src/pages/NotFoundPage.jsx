import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Home, ArrowLeft } from "lucide-react";

/**
 * 404 Not Found Page
 */

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-neutral-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
