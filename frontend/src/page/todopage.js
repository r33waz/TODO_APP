/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { postData, getData, deletedata } from "../service/axios.service.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Todopage() {
    const [todo, setTodo] = useState([]);
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Onsubmit = (data) => {
    console.log(data);
    trigger({ title: data.title, description: data.description });
  };

  const tododata = async (url, { arg }) => {
    console.log(url, arg);
    await postData(url, arg);
    toast.success("Todo added sucesfully");
  };
  const { trigger } = useSWRMutation("/api/v1/todo", tododata);

  //*Portion to get the data of todo list
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading } = useSWR("/api/v1/gettodos", fetcher);
  console.log(data);
  useEffect(() => {
    setTodo(data);
  }, [data]);

  //* For slideing the todo list
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {},
  };

  //* Deleting todo list
  const deleteTodo = async (id) => {
    console.log(id);
    try {
      const resp = await deletedata(`/api/v1/deletetodo/${id}`);
      if (resp.status) {
        const updatetodo = todo.filter((Todo) => {
          return Todo._id !== id;
        });
        setTodo(updatetodo);
      }
      toast.success("Todo deleted sucesfully");
    } catch (error) {}
  };

    //* API for eidit todo list
    const Eidittodo = async (id) => {
       navigate(`/todoeidit/${id}`)
    }
    
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="grid lg:w-[50%] md:w-[50%] w-96 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <form onSubmit={handleSubmit(Onsubmit)}>
            <div className="flex flex-col gap-8 p-8 bg-slate-800">
              <div className="flex items-center justify-center gap-2">
                <p className="font-serif text-2xl font-bold text-white underline">
                  Create Todo
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7 7h2v2H7V7m0 4h2v2H7v-2m0 4h2v2H7v-2m10 2h-6v-2h6v2m0-4h-6v-2h6v2m0-4h-6V7h6v2Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-lg font-bold text-white">Title</label>
                <input
                  type="text"
                  className="h-10 pl-3 rounded outline-none"
                  id="title"
                  autoComplete="off"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    Title field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-lg font-bold text-white">
                  Description
                </label>
                <textarea
                  type="text"
                  className="pl-3 rounded outline-none"
                  id="description"
                  autoComplete="off"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-sm text-red-500">
                    Description field is required
                  </span>
                )}
              </div>
              <div className="p-2 text-lg font-semibold text-center bg-white rounded active:bg-black active:text-white">
                <button type="submit">Create Todo</button>
              </div>
            </div>
          </form>
          <div className="h-96">
            <div className="pb-3 font-serif text-2xl font-bold text-center text-white underline">
              Todo List
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <Slider {...settings}>
                {todo?.map((i) => {
                  return (
                    <div className="w-full h-full">
                      <div className="flex flex-col p-3 text-white bg-black rounded">
                        <div className="flex justify-between">
                          Date : {i.tododate.slice(0, 10)}
                          <div className="flex gap-2">
                            <button
                              className="p-1 bg-red-600 rounded-full"
                              type="button"
                              onClick={() => {
                                deleteTodo(i._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
                                />
                              </svg>
                            </button>
                            <button className="p-1 bg-blue-600 rounded-full" type="button" onClick={()=>{Eidittodo(i._id)}}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex">
                          <p className="font-semibold ">Work : </p>
                          {i.title}
                        </div>
                        <div className="flex">
                          <p className="font-semibold ">Work Description :</p>
                          {i?.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todopage;
