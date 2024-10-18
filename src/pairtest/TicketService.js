import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  // Constants for ticket prices
  static TICKET_PRICES = {
    ADULT: 25,
    CHILD: 15,
    INFANT: 0,
  };

  // Main public method to purchase tickets
  purchaseTickets(accountId, ...ticketTypeRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException("Invalid account ID.");
    }

    // Initialize counts for each type of ticket
    let totalTickets = 0;
    let adultTickets = 0;
    let childTickets = 0;
    let infantTickets = 0;

    // Process each ticket request
    ticketTypeRequests.forEach((request) => {
      const type = request.getTicketType(); // This calls the getTicketType method
      const noOfTickets = request.getNoOfTickets();

      totalTickets += noOfTickets;

      if (type === "ADULT") {
        adultTickets += noOfTickets;
      } else if (type === "CHILD") {
        childTickets += noOfTickets;
      } else if (type === "INFANT") {
        infantTickets += noOfTickets;
      }
    });

    // Validate total number of tickets
    if (totalTickets > 25) {
      throw new InvalidPurchaseException(
        "Cannot purchase more than 25 tickets."
      );
    }

    // Ensure there is at least one adult ticket if children or infants are being purchased
    if ((childTickets > 0 || infantTickets > 0) && adultTickets === 0) {
      throw new InvalidPurchaseException(
        "Child or infant tickets cannot be purchased without an adult."
      );
    }

    // Calculate the total amount to pay
    const totalAmountToPay = this.#calculateTotalAmount(ticketTypeRequests);

    // Calculate the number of seats to reserve (Infants don't need seats)
    const totalSeatsToReserve = adultTickets + childTickets;

    // Call the external services to process payment and reserve seats
    const ticketPaymentService = new TicketPaymentService();
    const seatReservationService = new SeatReservationService();

    // Make payment
    ticketPaymentService.makePayment(accountId, totalAmountToPay);

    // Reserve seats
    seatReservationService.reserveSeat(accountId, totalSeatsToReserve);
  }

  // Private method to calculate total amount for tickets
  #calculateTotalAmount(ticketTypeRequests) {
    let totalAmount = 0;

    ticketTypeRequests.forEach((request) => {
      const type = request.getTicketType();
      const noOfTickets = request.getNoOfTickets();

      // Add the cost based on the type of ticket
      totalAmount += TicketService.TICKET_PRICES[type] * noOfTickets;
    });

    return totalAmount;
  }
}
