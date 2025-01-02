import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

interface ActionProps {
  link_update?: string;
  setModalDelete: any;
  _id: string;
  name: string;
}

function Actions({ link_update, setModalDelete, _id, name }: ActionProps) {
  function handleDelete() {
    setModalDelete(true, { _id, name: name });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {link_update && (
          <Link to={link_update}>
            <DropdownMenuItem>
              <FaEdit className="text-blue-500 mr-2 h-4 w-4" />
              <span className="font-medium">Sửa</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={handleDelete}>
          <FaRegTrashAlt className="text-red-500 mr-2 h-4 w-4" />
          <span className="font-medium">Xóa</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
