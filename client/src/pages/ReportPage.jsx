import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart2, FilePlus } from "lucide-react";

const ReportPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto p-6 bg-background shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-6">
        Statistical Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/create/orders")}
        >
          <FilePlus className="w-5 h-5" />
          Create Order Report
        </Button>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/create/products")}
        >
          <FilePlus className="w-5 h-5" />
          Create Product Report
        </Button>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/orders")}
        >
          <BarChart2 className="w-5 h-5" />
          Order Reports
        </Button>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/orders/detail")}
        >
          <BarChart2 className="w-5 h-5" />
          Order Report Details
        </Button>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/products")}
        >
          <BarChart2 className="w-5 h-5" />
          Product Reports
        </Button>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/report/products/detail")}
        >
          <BarChart2 className="w-5 h-5" />
          Product Report Details
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-lg shadow-inner">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportPage;
