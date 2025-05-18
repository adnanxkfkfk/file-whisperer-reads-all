
import { Suspense } from "react";
import Layout from "@/components/Layout";
import BookingForm from "@/components/booking/BookingForm";

const BookingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-transport-900">Book Our Transport Service</h1>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Fill out the form below to request our transport services. We'll get back to you promptly with confirmation details.
        </p>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <Suspense fallback={<div className="text-center py-10">Loading booking form...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
