import { useState } from "react";
import {
  Input,
  Stack,
  IconButton,
  useToast,
  Box,
  Container,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { useAppContext } from "../context/appContext";

export default function MessageForm() {
  const { supabase, username, country, auth } = useAppContext();
  const [message, setMessage] = useState("");
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (!message) return;

    setMessage("");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          text: message,
          username,
          country,
          is_authenticated: auth.user() ? true : false,
        },
      ]);

      if (error) {
        console.error(error.message);
        toast({
          title: "Error sending",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      console.log("Sucsessfully sent!");
    } catch (error) {
      console.log("error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box py="10px" pt="15px" bg="gray.100">
      <Container maxW="80%">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row">
            <Input
              name="message"
              placeholder="Enter a message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              bg="white"
              border="none"
              autoFocus
              maxLength="500"
            />
            <IconButton
              // variant="outline"
              colorScheme="teal"
              aria-label="Send"
              fontSize="20px"
              icon={<BiSend />}
              type="submit"
              disabled={!message}
              isLoading={isSending}
              className="glow-button"
            />
          </Stack>
        </form>
        <Box fontSize="10px" mt="1">
        Эй, эй! Я твой лучший помощник! Но не забывай, что здесь все видят, так что не передавай никакую секретную информацию! Мы же не хотим, чтобы наш чат стал главным героем скандальной истории, верно? 😉
        </Box>
      </Container>
    </Box>
  );
}
