import Reacto, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/message") 
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  }, []);

  return (
   <>
   <AdminNavbar/>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">S.N</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <tr key={msg.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{msg.name}</td>
                  <td className="py-2 px-4">{msg.email}</td>
                  <td className="py-2 px-4">{msg.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-gray-500 italic"
                >
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
};

export default ViewMessages;
