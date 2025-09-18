import { isValidEmail } from "../utils/isEmailValid";
import {
  createUpdateClientsCsvFile,
  isClientsCsvFileExist,
  readClientsCsvFile,
} from "../utils/CRUDClientCsvFile";

export interface Client {
  id?: string;
  name: string;
  email: string;
}
let clients: Client[] = await readClientsCsvFile();
interface ClientResponse {
  message: string;
  status: number;
  client?: Client;
}
export async function createClient(client: Client): Promise<ClientResponse> {
  const { name, email } = client;
  if (name.length < 3) {
    return { message: "Name should be bigger than 3 letters.", status: 401 };
  }

  if (!isValidEmail(email)) {
    return { message: "Enter valide email.", status: 401 };
  }
  const clientId = crypto.randomUUID();
  client = { ...client, id: clientId };

  clients.push(client);

  await createUpdateClientsCsvFile(clients);

  return { message: "New client created successfuly.", status: 201, client };
}

export async function updateClientName(
  clintId: string,
  newName: string
): Promise<ClientResponse> {
  try {
    // check if the csv file exist
    if (!isClientsCsvFileExist()) {
      throw new Error("Clients data doesn't exist.");
    }
    // check if the client id exit
    const client = clients.filter((c) => c.id == clintId)[0];
    if (!client) {
      throw new Error("Invalid client id.");
    }

    // validate the client's new name
    if (newName.length < 3) {
      throw new Error("The name must be greater than 3.");
    }

    // update client name logic

    const indexOfClient = clients.findIndex((c) => c == client);
    clients[indexOfClient] = { ...client, name: newName };

    await createUpdateClientsCsvFile(clients);

    return {
      status: 200,
      message: `Client's name updated successfuly to ${newName} `,
      client,
    };
  } catch (err: any) {
    return { message: err.message, status: 401 };
  }
}
