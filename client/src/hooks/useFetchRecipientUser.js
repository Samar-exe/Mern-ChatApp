import { useState, useEffect,} from "react";
import { base_URL, getRequest } from "../utils/services";

export default function useFetchRecipientUser(chat, user) {

  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(
        `${base_URL}/users/find/${recipientId}`
      );

      if (response.error) {
        setError(response);
      }
      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);

  return (
    {recipientUser,error}
  )
};

