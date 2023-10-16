"use client";
import Window from "./Window";
import Button from "./Button";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";

export default function TodoList() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState("");
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [description, setDescription] = useState("");

  function getTasks() {
    if (status === "authenticated" && session) {
      // @ts-ignore
      fetch(`api/todo?username=${encodeURIComponent(session?.user.username)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("fetched tasks: ", data.tasks);
          setTasks(data.tasks);
          setLoading(false);
        });
    }
  }

  async function editTask() {
    console.log("EEEEEE", selectedTask);
    try {
      const res = await fetch(
        `api/todo?username=${encodeURIComponent(
          // @ts-ignore
          session?.user.username
        )}&task=${encodeURIComponent(selectedTask)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: description,
            date: "Today",
          }),
        }
      );
      if (res.ok) {
        getTasks();
      }
      setIsEditTaskDialogOpen(false);
    } catch (error) {
      console.log("couldn't create the task: ", error);
    }
  }

  async function newTask() {
    try {
      const res = await fetch(
        `api/todo?username=${encodeURIComponent(
          // @ts-ignore
          session?.user.username
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: description,
            date: "Today",
          }),
        }
      );
      if (res.ok) {
        getTasks();
      }
      setIsNewTaskDialogOpen(false);
    } catch (error) {
      console.log("couldn't create the task: ", error);
    }
  }

  async function removeTask(id: string) {
    try {
      if (status === "authenticated" && session) {
        const res = await fetch(
          `api/todo?username=${encodeURIComponent(
            // @ts-ignore
            session?.user.username
          )}&task=${encodeURIComponent(id)}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          getTasks();
        }
      }
    } catch (error) {
      console.log("couldn't remove the task: ", error);
    }
  }

  useEffect(() => {
    if (!mounted) {
      getTasks();
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        !e.target.closest("#todo-list") &&
        !e.target.closest("#todo-actions") &&
        !e.target.closest("#edit-task-dialog") &&
        !e.target.closest("#new-task-dialog")
      ) {
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
      <Window
        title="Todo List"
        color="primary"
        onDismiss={() => {}}
        className="relative"
      >
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
              {!loading && tasks.length === 0 && (
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
        <div id="todo-actions" className="btn-group btn-group-end" role="group">
          <button
            className="btn filled-neutral"
            disabled={!selectedTask}
            onClick={() => removeTask(selectedTask)}
          >
            Remove
          </button>

          <button
            className="btn filled-neutral"
            disabled={!selectedTask}
            onClick={() => setIsEditTaskDialogOpen(true)}
          >
            Edit
          </button>
          <button
            className="btn filled-accent"
            onClick={() => setIsNewTaskDialogOpen(true)}
          >
            New Task
          </button>
        </div>
      </Window>
      {/* New Task */}
      <Dialog
        id="new-task-dialog"
        open={isNewTaskDialogOpen}
        onClose={() => setIsNewTaskDialogOpen(false)}
        className="w-full h-full flex justify-center"
      >
        <Window
          title="New Task"
          color="primary"
          onDismiss={() => setIsNewTaskDialogOpen(false)}
          className="max-w-md absolute top-[25rem]"
        >
          <div className="form-control">
            <input
              type="text"
              autoFocus
              placeholder="What should you do?"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button.Group>
            <Button color="accent" onClick={newTask}>
              Ok
            </Button>
          </Button.Group>
        </Window>
      </Dialog>
      {/* Edit Task */}
      <Dialog
        id="edit-task-dialog"
        open={isEditTaskDialogOpen}
        onClose={() => setIsEditTaskDialogOpen(false)}
        className="w-full h-full flex justify-center"
      >
        <Window
          title="Edit Task"
          color="primary"
          onDismiss={() => setIsEditTaskDialogOpen(false)}
          className="max-w-md absolute top-[25rem]"
        >
          <div className="form-control">
            <input
              type="text"
              autoFocus
              placeholder="What should you do instead?"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button.Group>
            <Button color="accent" onClick={editTask}>
              Ok
            </Button>
          </Button.Group>
        </Window>
      </Dialog>
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
  const combinedClasses: string = `${baseClass} ${
    selected ? "filled-tertiary" : ""
  } ${className || ""}`;
  return (
    <>
      <tr onClick={onClick} className={combinedClasses} role="button">
        <td className="p-3">
          <p
            className={`text-on-surface group-hover:text-on-tertiary ${
              selected ? "text-on-tertiary" : ""
            }`}
          >
            {desc}
          </p>
        </td>
        <td className="p-3">
          <p
            className={`text-on-surface group-hover:text-on-tertiary ${
              selected ? "text-on-tertiary" : ""
            }`}
          >
            {date}
          </p>
        </td>
      </tr>
    </>
  );
}

TodoList.Task = Task;
