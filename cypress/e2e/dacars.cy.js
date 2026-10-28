const baseUrl = "http://dacars.s3-website-us-east-1.amazonaws.com";
const apiUrl = "http://100.29.227.66:3000";

const runId = Date.now();
const password = "Cypress@12345";

const loginUser = {
  firstName: "Cypress",
  lastName: "Tester",
  email: `cypress.login.${runId}@example.com`,
  password,
};

const newUser = {
  firstName: "DaCars",
  lastName: "Cypress Test",
  email: `cypress.signup.${runId}@example.com`,
  password,
};

const duplicateUser = {
  firstName: "Duplicate",
  lastName: "Tester",
  email: `cypress.duplicate.${runId}@example.com`,
  password,
};

function visitAppRoute(path = "/") {
  cy.visit(baseUrl, {
    onBeforeLoad(win) {
      if (path !== "/") {
        win.history.replaceState(null, "", path);
      }
    },
  });
}

function fillSignupForm(user) {
  cy.get('input[name="firstName"]').should("be.visible").type(user.firstName);
  cy.get('input[name="lastName"]').type(user.lastName);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
  cy.get('input[name="confirmPassword"]').type(user.password);
  cy.get("form").find('button[type="submit"]').click();
}

function signInThroughUI() {
  cy.intercept("POST", "**/signin").as("loginRequest");

  visitAppRoute("/signin");

  cy.get('input[name="email"]').should("be.visible").type(loginUser.email);
  cy.get('input[name="password"]').should("be.visible").type(loginUser.password);
  cy.get("form").find('button[type="submit"]').click();

  cy.wait("@loginRequest").then(({ response }) => {
    expect(response, "login API response").to.exist;
    expect(response.statusCode).to.equal(200);
  });

  cy.location("pathname").should("eq", "/dashboard");
}


function pad(n) {
  return String(n).padStart(2, "0");
}

function futureDateTime(daysAhead, hour) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, 0, 0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:00`;
}

const dayOffset = 30 + (runId % 300);

function openBookingPageForAvailableCar() {
  visitAppRoute("/cars");

  cy.get(".car-card", { timeout: 15000 }).should("exist");

  cy.contains(".car-card .available", /^Available$/i)
    .closest(".car-card")
    .find(".details-btn")
    .click();

  cy.get(".cart-btn", { timeout: 15000 })
    .should("be.visible")
    .and("contain.text", "Book Now")
    .click();

  cy.location("pathname").should("match", /^\/booking\/[^/]+$/);
}

function submitBooking(startValue, endValue) {
  cy.intercept("POST", "**/bookings").as("createBooking");

  cy.get('input[name="startDate"]').should("be.visible").type(startValue);
  cy.get('input[name="endDate"]').type(endValue);

  // The rental summary appears once both dates are valid (3 hours)
  cy.contains("Rental Hours").should("be.visible");
  cy.contains("Estimated Total").should("be.visible");

  cy.contains("button", "Confirm Booking").click();

  cy.wait("@createBooking").then(({ response }) => {
    expect(response, "booking API response").to.exist;
    expect(response.statusCode).to.be.oneOf([200, 201]);
  });
}

describe("DaCars Cypress End-to-End Tests", () => {
  before(() => {
    cy.request("POST", `${apiUrl}/signup`, loginUser)
      .its("status")
      .should("equal", 201);

    cy.request("POST", `${apiUrl}/signup`, duplicateUser)
      .its("status")
      .should("equal", 201);
  });

  it("TC01 - registers a new customer", () => {
    cy.intercept("POST", "**/signup").as("signupRequest");

    visitAppRoute("/signup");
    fillSignupForm(newUser);

    cy.wait("@signupRequest").then(({ response }) => {
      expect(response, "signup API response").to.exist;
      expect(response.statusCode).to.equal(201);
    });

    cy.location("pathname").should("eq", "/signin");
  });

  it("TC02 - rejects a duplicate signup email", () => {
    cy.intercept("POST", "**/signup").as("duplicateSignup");

    visitAppRoute("/signup");
    fillSignupForm(duplicateUser);

    cy.wait("@duplicateSignup").then(({ response }) => {
      expect(response, "signup API response").to.exist;
      expect(response.statusCode).to.be.oneOf([400, 409]);
      expect(response.body.error).to.match(/already|exist|registered|duplicate/i);
    });

    cy.location("pathname").should("eq", "/signup");
  });

  it("TC03 - signs in with valid credentials", () => {
    signInThroughUI();

    cy.contains("You have successfully signed in").should("be.visible");
    cy.contains(loginUser.email).should("be.visible");
  });

  it("TC04 - rejects an incorrect password", () => {
    cy.intercept("POST", "**/signin").as("invalidLogin");

    visitAppRoute("/signin");

    cy.get('input[name="email"]').should("be.visible").type(loginUser.email);
    cy.get('input[name="password"]').type("WrongPassword123");
    cy.get("form").find('button[type="submit"]').click();

    cy.wait("@invalidLogin").then(({ response }) => {
      expect(response, "login API response").to.exist;
      expect(response.statusCode).to.equal(401);
      expect(response.body.error).to.equal("Invalid email or password");
    });

    cy.location("pathname").should("eq", "/signin");
  });

  it("TC05 - displays the available cars", () => {
    signInThroughUI();
    visitAppRoute("/cars");

    cy.get(".car-card", { timeout: 15000 }).should("exist");
    cy.get(".car-card").its("length").should("be.greaterThan", 0);
  });

  it("TC06 - opens details for a selected car", () => {
    signInThroughUI();
    visitAppRoute("/cars");

    cy.get(".car-card", { timeout: 15000 }).should("exist");

    cy.contains(".car-card .available", /^Available$/i)
      .closest(".car-card")
      .as("availableCard");

    cy.get("@availableCard")
      .find("h2")
      .invoke("text")
      .then((cardName) => {
        cy.get("@availableCard").find(".details-btn").click();

        cy.location("pathname").should("match", /^\/cars\/[^/]+$/);

        cy.contains("Loading Car Details").should("not.exist");
        cy.get(".car-details-card", { timeout: 15000 }).should("exist");

        // The details page shows the same car that was clicked
        cy.get(".car-details-content h1")
          .should("be.visible")
          .and("have.text", cardName.trim());
        cy.get(".car-details-image").should("be.visible");
        cy.contains(".car-details-content .available", /^Available$/i).should(
          "be.visible"
        );
      });
  });

  it("TC07 - opens booking for an available car", () => {
    signInThroughUI();
    visitAppRoute("/cars");

    cy.get(".car-card", { timeout: 15000 }).should("exist");

    // Pick a car whose availability label is "Available"
    cy.contains(".car-card .available", /^Available$/i)
      .closest(".car-card")
      .find(".details-btn")
      .click();

    cy.get(".cart-btn", { timeout: 15000 })
      .should("be.visible")
      .and("contain.text", "Book Now")
      .click();

    cy.location("pathname").should("match", /^\/booking\/[^/]+$/);
    cy.contains("h2", "Book a Car").should("be.visible");
  });

  it("TC08 - books a car with rental dates", () => {
    signInThroughUI();
    openBookingPageForAvailableCar();

    submitBooking(
      futureDateTime(dayOffset, 10),
      futureDateTime(dayOffset, 13)
    );

    // After booking, the app sends the user to the payment page
    cy.location("pathname").should("match", /^\/payment\/[^/]+$/);
  });

  it("TC09 - pays at pickup and reaches the payment-success page", () => {
    cy.intercept("POST", "**/payments").as("createPayment");

    signInThroughUI();
    openBookingPageForAvailableCar();

    submitBooking(
      futureDateTime(dayOffset + 1, 10),
      futureDateTime(dayOffset + 1, 13)
    );

    cy.location("pathname").should("match", /^\/payment\/[^/]+$/);

    cy.contains("Loading Payment").should("not.exist");
    cy.contains("h1", "Payment").should("be.visible");

    cy.contains("button.method", "Pay at Pickup").click();
    cy.contains("You can pay the full rental amount").should("be.visible");

    cy.get(".pay-button").should("not.be.disabled").click();

    cy.wait("@createPayment").then(({ response }) => {
      expect(response, "payment API response").to.exist;
      expect(response.statusCode).to.be.oneOf([200, 201]);
    });

    cy.location("pathname").should("eq", "/payment-success");
    cy.contains("Payment Successful!").should("be.visible");
    cy.contains("Your DaCars booking has been confirmed.").should("be.visible");
  });
});