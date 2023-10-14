import Window from "./Window";
import Button from "./Button";
import Table from "./Table";

export default function TodoList() {
  return (
    <>
      <Window title="Todo List" color="primary" dismissable="back">
        <Button.Group>
          <input type="text" placeholder="Start typing to filter..." />
          <Button disabled>Clear</Button>
        </Button.Group>
        <Table>
          <thead>
            <tr>
              <th className="w-[80%]">
                <Button variant="th">Description</Button>
              </th>
              <th>
                <Button variant="th">Date</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <TodoList.Task desc="Test task" date="10/12/2023" />
          </tbody>
        </Table>
        <Button.Group>
          <Button disabled>Remove</Button>
          <Button disabled>Edit</Button>
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
          <p className="text-on-neutral group-hover:text-on-tertiary">{desc}</p>
        </td>
        <td className="p-3">
          <p className="text-on-neutral group-hover:text-on-tertiary">{date}</p>
        </td>
      </tr>
    </>
  );
}

TodoList.Task = Task;
