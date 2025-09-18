function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

interface Client {
  name: string;
  email: string;
}
export function createClient(client: Client) {
  const { name, email } = client;
  if (name.length < 3) {
    return { message: "Name should be bigger than 3 letters", status: 401 };
  }
  if (!isValidEmail(email)) {
    return "Enter valide email";
  }

  return { message: "New client created successfuly", status: 201, client };
}
