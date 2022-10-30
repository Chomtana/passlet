import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { utils, Wallet } from "ethers";

enum KeyGenerationState {
  PENDING,
  SUCCESS,
}

function App() {
  const [state, setState] = useState(KeyGenerationState.PENDING);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setState(KeyGenerationState.PENDING);
  }, [password1, password2]);

  const generateKey = useCallback(async () => {
    const _privateKey = utils.keccak256(
      utils.defaultAbiCoder.encode(["string", "string"], [password1, password2])
    );
    setPrivateKey(_privateKey);
    setWalletAddress(new Wallet(_privateKey).address);

    setState(KeyGenerationState.SUCCESS);
  }, [password1, password2]);

  return (
    <div className="App">
      <Container>
        <Stack spacing={3}>
          <Heading>Passlet</Heading>
          <Text fontSize="md">
            Memorizable private key generator from two passwords
          </Text>
          <Text fontSize="md">
            Generate and unlock your wallet using two passwords
          </Text>
          <Text fontSize="md">
            By{" "}
            <a href="https://github.com/Chomtana" target="_blank">
              <u>Chomtana</u>
            </a>
          </Text>
        </Stack>

        <Box mt={5}>
          <HStack
            spacing="16px"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <a
              href="https://github.com/Chomtana/pk-from-password"
              target="_blank"
            >
              <Button colorScheme="teal">Github</Button>
            </a>

            <a
              href="https://github.com/Chomtana/pk-from-password"
              target="_blank"
            >
              <Button colorScheme="teal">Documentation</Button>
            </a>
          </HStack>
        </Box>

        <Stack mt={6} spacing={3}>
          <FormControl>
            <FormLabel>Password 1</FormLabel>
            <Input
              bg="white"
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password 2</FormLabel>
            <Input
              bg="white"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Box mt={5}>
          <Button colorScheme="blue" width="100%" onClick={() => generateKey()}>
            Generate
          </Button>
        </Box>

        {state == KeyGenerationState.SUCCESS && (
          <Box
            mt={6}
            width="100%"
            borderRadius="lg"
            bg="white"
            p={4}
            textAlign="left"
          >
            <Stack spacing={3}>
              <Box>
                <Text fontWeight="bold">Private Key</Text>
                <Text>{privateKey}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Wallet Address</Text>
                <Text>{walletAddress}</Text>
              </Box>
            </Stack>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
