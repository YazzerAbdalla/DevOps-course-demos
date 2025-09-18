function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

interface Client {
  name: string;
  email: string;
}
interface ClientResponse {
  message: string;
  status: number;
  client?: Client;
}
export function createClient(client: Client): ClientResponse {
  const { name, email } = client;
  if (name.length < 3) {
    return { message: "Name should be bigger than 3 letters.", status: 401 };
  }
  if (!isValidEmail(email)) {
    return { message: "Enter valide email.", status: 401 };
  }

  return { message: "New client created successfuly.", status: 201, client };
}
