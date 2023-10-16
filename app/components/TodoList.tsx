"use client";
import Window from "./Window";
import Button from "./Button";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog } from '@headlessui/react'

export default function TodoList() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState("");

  function getTasks() {
    if (status === "authenticated" && session) {
      // @ts-ignore
      fetch(`api/todo?username=${encodeURIComponent(session?.user.username)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("fetched tasks: ", data.tasks);
          setTasks(data.tasks);
          setLoading(false);
        });
    }
  }

  function editTask() {}

  function removeTask() {}

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest("#todo-list")) {
        setSelectedTask("");
      }
    };
    document.body.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  console.log(selectedTask);
  return (
    <>
      <Window title="Todo List" color="primary" dismissable="back">
        <Button.Group>
          <div className="form-control">
            <input
              autoFocus
              type="text"
              placeholder="Start typing to filter..."
            />
          </div>
          <Button disabled color="neutral">
            Clear
          </Button>
        </Button.Group>
        {/* <div className="table-container">
        <div className="flex justify-start text-on-neutral items-start pt-3 px-3">You have nothing to do yet.</div>
        </div> */}
        <div id="todo-list">
          <Table>
            <thead>
              <tr>
                <th>
                  <Button variant="th" color="neutral">
                    Description
                  </Button>
                </th>
                <th>
                  <Button variant="th" color="neutral">
                    Date
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="p-3">
                    <span>Loading...</span>
                  </td>
                </tr>
              )}
              {!tasks && (
                <tr>
                  <td className="p-3">
                    <span>You have nothing to do.</span>
                  </td>
                </tr>
              )}
              {tasks.length > 0 &&
                tasks.map((task: any) => (
                  <TodoList.Task
                    key={task._id}
                    desc={task.description}
                    date={task.date}
                    selected={selectedTask === task._id}
                    onClick={() => setSelectedTask(task._id)}
                  />
                ))}
            </tbody>
          </Table>
        </div>
        <Button.Group>
          <Button disabled={!selectedTask} color="neutral">
            Remove
          </Button>
          <Button disabled={!selectedTask} color="neutral">
            Edit
          </Button>
          <Button color="accent">New Task</Button>
        </Button.Group>
      </Window>
    </>
  );
}

function Task({
  desc,
  date,
  onClick,
  className,
  selected,
}: {
  desc: string;
  date: string;
  role?: string;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
  className?: string;
  selected?: boolean;
}) {
  const baseClass: string = "group hover:bg-tertiary";
  const combinedClasses: string = `${baseClass} ${selected ? 'filled-tertiary' : ''} ${className || ""}`;
  return (
    <>
      <tr onClick={onClick} className={combinedClasses} role="button">
        <td className="p-3">
          <p className={`text-on-surface group-hover:text-on-tertiary ${selected ? 'text-on-tertiary' : ''}`}>{desc}</p>
        </td>
        <td className="p-3">
          <p className={`text-on-surface group-hover:text-on-tertiary ${selected ? 'text-on-tertiary' : ''}`}>{date}</p>
        </td>
      </tr>
    </>
  );
}

TodoList.Task = Task;
