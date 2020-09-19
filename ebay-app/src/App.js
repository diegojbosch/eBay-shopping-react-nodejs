import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import SearchForm from "./components/SearchForm";

export default function App() {
  const { register, handleSubmit, errors } = useForm();

  return (
    <SearchForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
