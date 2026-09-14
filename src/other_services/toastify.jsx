
import { toast } from 'react-toastify';

export default function toastify(message, type = "default") {
  if (type === "error") toast.error(message);
  else if (type === "success") toast.success(message);
  else toast(message);
}