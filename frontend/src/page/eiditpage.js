import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useNavigate, useParams } from "react-router-dom";
import { getData, updatedata } from "../service/axios.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Eidittodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState();
  //* getdata according to todo list id
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading } = useSWR(`/api/v1/gettodos/${id}`, fetcher);
  //   console.log(data);

  useEffect(() => {
    setTodo(data);
  }, [data]);
  ////

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //*updating the todo list
  const Onsubmit = (data) => {
    console.log(data);
    trigger({ title: data?.title, description: data?.description });
  };

  const todoupdate = async (url, { arg }) => {
    await updatedata(url, arg);
    toast("Todo updated sucessfully");
    navigate("/");
  };

  const { trigger } = useSWRMutation(`/api/v1/updatetodo/${id}`, todoupdate);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-8 p-8 bg-slate-800 lg:w-[35%] md:w-[35%] w-[70%]">
          <div className="flex items-center justify-center gap-5">
            <p className="font-serif text-2xl font-bold text-white underline">
              Eidit Todo
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
              />
            </svg>
          </div>
          <form onSubmit={handleSubmit(Onsubmit)}>
            <div className="flex flex-col gap-2 font-semibold ">
              <label className="text-white">Title</label>
              <input
                type="text"
                className="h-10 pl-3 rounded outline-none"
                autoComplete="off"
                id="title"
                defaultValue={todo?.title}
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-600">Title is required</span>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-6 font-semibold ">
              <label className="text-white">Description</label>
              <textarea
                type="text"
                className="h-10 pl-3 rounded outline-none"
                autoComplete="off"
                id="description"
                placeholder={todo?.description}
                defaultValue={todo?.description}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-600">Description is required</span>
              )}
            </div>
            <div className="p-2 mt-6 text-lg font-semibold text-center bg-white rounded active:bg-black active:text-white">
              <button type="submit">Update Todo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Eidittodo;
