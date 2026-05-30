import request from "supertest";
import express, { response } from "express";
import type { Application } from "express";
import accountRoutes from "../routes/account.routes";
import pool from "../config/db"
const app: Application = express();

app.use(express.json())
app.use("/api/accounts", accountRoutes);

afterAll(async () => {
  await pool.end(); 
});

describe("Account API", () => {
    it("should create a new account" , async()=> {
        const response = await request(app)
            .post("/api/accounts")
            .send({owner: "Abhi" , initialBalance: 5000});
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.owner).toBe("Abhi");
        expect(response.body.data.balance).toBe("5000.00");
    });

    it("should get an account by id " , async()=> {
        const created = await request(app)
            .post("/api/accounts")
            .send({owner : "Ashok" , initialBalance:3000});
        
        const accountId = created.body.data.id;

        const response = await request(app)
            .get(`/api/accounts/${accountId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(accountId);
        expect(response.body.data.owner).toBe("Ashok");
    })

    it("should deposite money into an account" , async()=> {
        const created = await request(app)
            .post("/api/accounts")
            .send({owner: "Ashok" , initialBalance: 1000});
        const accountId = created.body.data.id;

        const response = await request(app)
            .post("/api/accounts/deposit")
            .send({accountId , amount: 500});

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.balance).toBe("1500.00")
    })

    it("should withdraw money from account " , async()=>{
        const created = await request(app)
            .post("/api/accounts")
            .send({owner: "Abhi" , initialBalance: 2000})

        const accountId = created.body.data.id;

        const response  = await request(app)
            .post("/api/accounts/withdraw")
            .send({accountId , amount: 500})

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
          expect(response.body.data.balance).toBe("1500.00");
        
    })
    

it("should transfer money between accounts", async () => {
  // Create two accounts
  const account1 = await request(app)
    .post("/api/accounts")
    .send({ owner: "Ashok", initialBalance: 3000 });

  const account2 = await request(app)
    .post("/api/accounts")
    .send({ owner: "Abhi", initialBalance: 1000 });

  const fromAccountId = account1.body.data.id;
  const toAccountId = account2.body.data.id;

  // Transfer
  const response = await request(app)
    .post("/api/accounts/transfer")
    .send({ fromAccountId, toAccountId, amount: 1000 });
    console.log(response.body)
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Transfer successful");
});

it("should get transactions for an account", async () => {
        const created = await request(app)
            .post("/api/accounts")
            .send({ owner: "Transaction Test", initialBalance: 1000 });

        const accountId = created.body.data.id;

        await request(app)
            .post("/api/accounts/deposit")
            .send({ accountId, amount: 500 });

        await request(app)
            .post("/api/accounts/withdraw")
            .send({ accountId, amount: 200 });

        const response = await request(app)
            .get(`/api/accounts/${accountId}/transactions`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
        expect(response.body.data[0]).toMatchObject({
            account_id: accountId,
            type: "withdraw",
        });
        expect(Number(response.body.data[0].amount)).toBe(200);
        expect(response.body.data[1]).toMatchObject({
            account_id: accountId,
            type: "deposit",
        });
        expect(Number(response.body.data[1].amount)).toBe(500);
    });


 it("should return 404 for non-existing account", async () => {
  const response = await request(app)
    .get("/api/accounts/non-existing-id");

  expect(response.status).toBe(404);
  expect(response.body.success).toBe(false);
});

it("should fail withdraw when insufficient balance", async () => {
  const created = await request(app)
    .post("/api/accounts")
    .send({ owner: "Ashok", initialBalance: 100 });

  const accountId = created.body.data.id;

  const response = await request(app)
    .post("/api/accounts/withdraw")
    .send({ accountId, amount: 500 });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Insufficient funds");
});

});
