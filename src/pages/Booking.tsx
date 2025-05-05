
import Layout from "@/components/Layout";
import BookingForm from "@/components/booking/BookingForm";

const BookingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-transport-900">Book Our Transport Service</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <BookingForm />
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
