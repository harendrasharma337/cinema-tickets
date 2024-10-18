import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

const ticketService = new TicketService();

try {
  // Example purchase: 2 adults, 1 child, 1 infant
  const adultRequest = new TicketTypeRequest("ADULT", 2);
  const childRequest = new TicketTypeRequest("CHILD", 1);
  const infantRequest = new TicketTypeRequest("INFANT", 1);

  // Call the purchaseTickets method with the requests
  ticketService.purchaseTickets(1, adultRequest, childRequest, infantRequest);

  console.log("Purchase successful!");
} catch (error) {
  console.error(error.message);
}
