"use client";

import { useEffect, useState } from "react";
import { supabase } from "../api/page";
import Image from "next/image";

const TTest = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
        const { data, error } = await supabase.from("tools").select("title, description, image_url");
        if (error) {
            console.error("Error fetching tasks:", error);
        } else {
            setTasks(data);
        }
        }
        fetchTasks();
    }, []);

    return (
        <div className="flex">
        {/* Sol Navigasyon Menüsü */}
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h1 className="text-xl font-bold mb-8">OCB STD</h1>
            <nav className="space-y-4">
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Dashboard</a>
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Projects</a>
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Task list</a>
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Services</a>
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Notifications</a>
            <a href="#" className="block text-gray-300 hover:text-white text-lg">Chat</a>
            </nav>
            <div className="mt-16">
            <div className="flex items-center">
                <Image src="https://via.placeholder.com/40" alt="Profile" className="rounded-full mr-2" />
                <div>
                <p className="text-sm font-semibold">Osman Can Bozoğlu</p>
                <p className="text-xs text-gray-400">ocbstd.com</p>
                </div>
            </div>
            </div>
        </div>

      {/*<div className="flex-1 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center bg-white p-4 shadow">
            <input
                type="text"
                placeholder="Search"
                className="border rounded px-4 py-2 w-1/3"
            />
            <p className="text-gray-600">Monday, 6th March</p>
            <button className="border px-4 py-2 rounded bg-gray-100">Card</button>
        </div>
      </div>*/}

        {/* Sayfa İçeriği */}
        <div className="p-4 space-y-4">
          {/* "Last Tasks" Tablosu */}
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Last tasks</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Image</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 font-semibold text-gray-700">{task.title}</td>
                    <td className="py-2 px-4 text-gray-600">{task.description}</td>
                    <td className="py-2 px-4">
                      <Image
                        src={task.image_url}
                        alt={task.title}
                        className="w-16 h-16 object-cover rounded shadow"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
 
export default TTest;