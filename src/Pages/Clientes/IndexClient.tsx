import Clientes from "./Clientes";
import { ClientProvider } from "./ClientProvider";

export default function IndexClient() {
  return (
    <>
      <ClientProvider>
        <Clientes />
      </ClientProvider>
    </>
  );
}
