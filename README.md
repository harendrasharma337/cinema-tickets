# cinema-tickets

# Ticket Service Implementation

This repository contains the implementation of a `TicketService` for purchasing tickets based on specified business rules. The service interacts with external payment and seat reservation services.

## Features
- Supports purchasing tickets for adults, children, and infants.
- Applies business rules to ensure valid ticket combinations.
- Interacts with external services for payment and seat reservations.

## Requirements
- **Node.js** version 20 or later.
- Package dependencies listed in `package.json`.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harendrasharma337/ticket-service.git
   cd ticket-service
   ```

2. **Install dependencies**:
   Ensure you are in the project directory and run the following command to install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To manually test the ticket service, you can run the script provided:

1. **Modify the test script**:
   Update the `ticketService.mannual.js` with the desired ticket requests.

2. **Run the script**:
   ```bash
   node ticketService.mannual.js
   ```

If the purchase is successful, you will see the message:
```bash
Purchase successful!
```

If the purchase request is invalid, an error message will be printed to the console.

## Running Unit Tests

This project uses **Mocha** and **Chai** for unit testing.

### Steps to Run Tests:

1. **Ensure Mocha and Chai are installed**:
   If you haven't installed them yet, run:
   ```bash
   npm install mocha chai --save-dev
   ```

2. **Run the tests**:
   Run the following command to execute the test cases:
   ```bash
   npm test
   ```

3. **Expected Output**:
   You should see the test results in the terminal, similar to:
   ```
     TicketService Tests
       ✓ should successfully purchase tickets with valid requests
       ✓ should throw an error when no adult tickets are purchased with children or infants
       ✓ should throw an error when more than 25 tickets are purchased

     3 passing (50ms)
   ```

### Test Coverage

- **Valid ticket purchase**: Verifies that valid combinations of ticket requests process correctly.
- **Invalid ticket purchase (no adults)**: Ensures that purchasing child or infant tickets without an accompanying adult throws an error.
- **Exceeding ticket limit**: Ensures that trying to purchase more than 25 tickets throws an error.

## Project Structure

```plaintext
.
├── lib/
│   ├── TicketTypeRequest.js    # Immutable class for ticket type requests
│   ├── TicketPaymentService.js # External service for ticket payments
│   └── SeatReservationService.js # External service for seat reservations
├── TicketService.js            # Main ticket service implementation
├── your_test_script.js         # Example script to run the service manually
├── test/
│   └── ticketService.test.js   # Mocha test cases for TicketService
    └── ticketService.mannual.js # For mannual testing using node ticketService.mannual.js [Note: make sure you shuld be in test forlder to run this node commnad]
├── README.md                   # Project documentation
├── package.json                # Project dependencies and scripts
```

## Business Rules

- **Ticket Types**: Adult, Child, and Infant.
- **Ticket Prices**:
  - Adult: £25
  - Child: £15
  - Infant: Free (Infants do not occupy a seat).
- **Maximum Tickets**: A maximum of 25 tickets can be purchased in one transaction.
- **Adult Requirement**: Child and Infant tickets cannot be purchased without an accompanying Adult ticket.

## Assumptions

- All accounts with an ID greater than zero are valid and have sufficient funds.
- Payment and seat reservation services are functioning as expected and have no defects.
  
