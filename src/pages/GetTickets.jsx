import UserTickets from "../features/tickets/UserTickets";
import Heading from "../ui/Heading";

function GetTickets() {
  return (
    <>
      <Heading as="h1">Support Tickets</Heading>

      <UserTickets />
    </>
  );
}

export default GetTickets;
