import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from './../../components/Doctors/DoctorCard';
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMessage={error} />;
  }

  // Ensure appointments is an array before mapping
  if (!Array.isArray(appointments)) {
    return null; // or handle this case appropriately
  }

  return (
    <div>
      {appointments.length === 0 ? (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map(doctor => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
