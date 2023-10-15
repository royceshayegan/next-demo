"use client";
import Window from "./Window";
import Button from "./Button";
import Table from "./Table";

export default function TodoList() {
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
            <TodoList.Task desc="You have nothing to do." date="Today" />
          </tbody>
        </Table>
        <Button.Group>
          <Button disabled color="neutral">
            Remove
          </Button>
          <Button disabled color="neutral">
            Edit
          </Button>
          <Button color="accent">New Task</Button>
        </Button.Group>
      </Window>
    </>
  );
}

function Task({ desc, date }: { desc: string; date: string }) {
  return (
    <>
      <tr className="group hover:bg-tertiary p-3" role="button">
        <td className="p-3">
          <p className="text-on-surface group-hover:text-on-tertiary">{desc}</p>
        </td>
        <td className="p-3">
          <p className="text-on-surface group-hover:text-on-tertiary">{date}</p>
        </td>
      </tr>
    </>
  );
}

TodoList.Task = Task;
