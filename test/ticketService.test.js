import { expect } from "chai";
import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

describe("TicketService Tests", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should successfully purchase tickets with valid requests", () => {
    const adultRequest = new TicketTypeRequest("ADULT", 2);
    const childRequest = new TicketTypeRequest("CHILD", 1);
    const infantRequest = new TicketTypeRequest("INFANT", 1);

    expect(() =>
      ticketService.purchaseTickets(
        1,
        adultRequest,
        childRequest,
        infantRequest
      )
    ).to.not.throw(); // The method should not throw an exception for valid input
  });

  it("should throw an error when no adult tickets are purchased with children or infants", () => {
    const childRequest = new TicketTypeRequest("CHILD", 1);
    const infantRequest = new TicketTypeRequest("INFANT", 1);

    expect(() =>
      ticketService.purchaseTickets(1, childRequest, infantRequest)
    ).to.throw("Child or infant tickets cannot be purchased without an adult");
  });

  it("should throw an error when more than 25 tickets are purchased", () => {
    const adultRequest = new TicketTypeRequest("ADULT", 26);

    expect(() => ticketService.purchaseTickets(1, adultRequest)).to.throw(
      "Cannot purchase more than 25 tickets."
    );
  });
});
