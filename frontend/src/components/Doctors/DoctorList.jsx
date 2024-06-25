import React from 'react';
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import {doctorss} from './../../assets/data/doctors';
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const DoctorList = () => {
    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

    // Ensure doctors is an array before mapping
    const validDoctors = Array.isArray(doctors) ? doctorss : [];

    return (
        <>
            {loading && <Loader />}
            {error && <Error message={error} />}
            {!loading && !error && validDoctors.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                    {validDoctors.map(doctor => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>
            )}
        </>
    );
};

export default DoctorList;
