import { toast } from "react-toastify";

interface Props {
  type?: 'success' | 'error' | 'warning'
  message: string
}

export const notify = ({ type = 'success', message }: Props) => {
  if (type === 'success') {
    toast.success(message)
  }

  if (type === 'error') {
    toast.error(message)
  }
}