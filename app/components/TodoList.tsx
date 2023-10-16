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
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");

  // When dialogs get dismissed, reset the error state.
  useEffect(() => {
      setError("");
  }, [isEditTaskDialogOpen, isNewTaskDialogOpen]);

  function getTasks() {
    if (status === "authenticated" && session) {
      fetch(
        // @ts-ignore
        `api/todo?username=${encodeURIComponent(session?.user?.username)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.tasks);
          setLoading(false);
        });
    }
  }

  function editTask(e: any) {
    e.preventDefault();
    if (!description) {
      setError("You wanted to change something...");
      return;
    }
    try {
      fetch(
        `api/todo?username=${encodeURIComponent(
          // @ts-ignore
          session?.user?.username
        )}&task=${encodeURIComponent(selectedTask)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: description,
            date: "Today",
          }),
        }
      ).then((res) => {
        if (res.ok) {
          getTasks();
        }
      });
      setDescription("");
      setIsEditTaskDialogOpen(false);
    } catch (error) {
      console.log("couldn't create the task: ", error);
    }
  }

  function newTask(e: any) {
    e.preventDefault();
    if (!description) {
      setError("You can't just do nothing all day.");
      return;
    }
    try {
      fetch(
        `api/todo?username=${encodeURIComponent(
          // @ts-ignore
          session?.user?.username
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: description,
            date: "Today",
          }),
        }
      ).then((res) => {
        if (res.ok) {
          getTasks();
        }
      });
      setDescription("");
      setIsNewTaskDialogOpen(false);
    } catch (error) {
      console.log("couldn't create the task: ", error);
    }
  }

  function removeTask() {
    try {
      if (status === "authenticated" && session) {
        fetch(
          `api/todo?username=${encodeURIComponent(
            // @ts-ignore
            session?.user?.username
          )}&task=${encodeURIComponent(selectedTask)}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          if (res.ok) {
            getTasks();
          }
        });
      }
    } catch (error) {
      console.log("couldn't remove the task: ", error);
    }
  }

  // Get tasks on load.
  useEffect(() => {
    getTasks();
  }, []);

  // Deselect tasks when clicking outside of certain elements.
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
              value={filter}
              placeholder="Start typing to filter..."
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Button
            disabled={!filter}
            color="neutral"
            onClick={() => setFilter("")}
          >
            Clear
          </Button>
        </Button.Group>
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
        <Button.Group id="todo-actions">
          <Button
            color="neutral"
            disabled={!selectedTask}
            onClick={removeTask}
          >
            Remove
          </Button>

          <Button
            color="neutral"
            disabled={!selectedTask}
            onClick={() => setIsEditTaskDialogOpen(true)}
          >
            Edit
          </Button>
          <Button color="accent" onClick={() => setIsNewTaskDialogOpen(true)}>
            New Task
          </Button>
        </Button.Group>
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
          <form onSubmit={newTask}>
            <div className="form-control">
              <input
                type="text"
                autoFocus
                placeholder="What should you do?"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error && (
                <div className="filled-error px-3 py-1 mt-1 inline-block">
                  <span className="text-base">{error}</span>
                </div>
              )}
            <Button.Group>
            <Button color="neutral" type="button" onClick={() => setIsNewTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button color="accent" type="submit">
                Ok
              </Button>
            </Button.Group>
          </form>
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
          <form onSubmit={editTask}>
            <div className="form-control">
              <input
                type="text"
                autoFocus
                placeholder="What should you do instead?"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error && (
                <div className="filled-error px-3 py-1 mt-1 inline-block">
                  <span className="text-base">{error}</span>
                </div>
              )}
            <Button.Group>
            <Button color="neutral" type="button" onClick={() => setIsEditTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button color="accent" type="submit">
                Ok
              </Button>
            </Button.Group>
          </form>
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
